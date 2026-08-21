import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { aj } from "../arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type NormalizedResponse = {
  resp: string;
  ui?: string;
  trip_plan?: unknown;
  error?: string;
};

const PROMPT = `
You are TripVerse AI, a travel planning assistant.

Your job is to collect trip information in the following fixed order.

Step 1 -> Starting Location
Step 2 -> Destination
Step 3 -> Group Size
Step 4 -> Budget
Step 5 -> Trip Duration
Step 6 -> Travel Interests
Step 7 -> Special Requirements
Step 8 -> Generate Final Trip

Rules:

- Always read the entire conversation history.
- Never ask a question that has already been answered.
- Never go back to a previous step.
- Always move to the next unanswered step.
- Ask only ONE question.
- Keep responses under 25 words.

Recognize these answers:

Group Size:
- Just Me
- Couple
- Family
- Friends

Budget:
- Cheap
- Moderate
- Luxury

Trip Duration:
- Any number of days such as:
  - 2 Days
  - 5 Days
  - 10 Days

If the user has answered:

Source + Destination
→ Ask Group Size

Source + Destination + Group Size
→ Ask Budget

Source + Destination + Group Size + Budget
→ Ask Trip Duration

Source + Destination + Group Size + Budget + Trip Duration
→ Ask Travel Interests

Source + Destination + Group Size + Budget + Trip Duration + Interests
→ Ask Special Requirements

If every step is completed
→ Return ui = "final"

UI values:

groupSize
budget
tripDuration
final

For starting location, destination, travel interests, and special requirements,
return a normal text reply and leave ui empty.

Return ONLY valid JSON.

Required response format:
{
  "resp": "short question or confirmation"
}

Example:

{
  "resp":"How many days do you want to travel?",
  "ui":"tripDuration"
}
`;

const FINAL_PROMPT = `
Generate a Travel Plan with the given details.

Give me:

- Hotels options list with:
  - Hotel Name
  - Hotel Address
  - Price per Night
  - Hotel Image URL
  - Geo Coordinates
  - Rating
  - Description

Also generate a travel itinerary with:

- Place Name
- Place Details
- Place Image URL
- Geo Coordinates
- Place Address
- Ticket Pricing
- Travel Time between locations
- Best Time to Visit

Return everything in the following JSON format.

Output Schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",

    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",

        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },

        "rating": "number",
        "description": "string"
      }
    ],

    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",

        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",

            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },

            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

function parseModelResponse(content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return null;
  }

  const fencedJsonMatch = trimmedContent.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonCandidate = fencedJsonMatch?.[1]?.trim() ?? trimmedContent;

  try {
    return JSON.parse(jsonCandidate);
  } catch {
    const jsonMatch = jsonCandidate.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
}

function normalizeChatResponse(parsed: unknown, rawText: string, isFinal: boolean) {
  const fallbackResp = isFinal ? "Here is your trip plan." : "What is your starting location?";

  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    const resp = typeof record.resp === "string" ? record.resp : rawText.trim();
    const uiValue = typeof record.ui === "string" ? record.ui : "";

    return ["groupSize", "budget", "tripDuration", "final"].includes(uiValue)
      ? {
        resp: resp || fallbackResp,
        ui: uiValue,
      }
      : {
        resp: resp || fallbackResp,
      };
  }

  return {
    resp: rawText.trim() || fallbackResp,
  };
}

function extractResponseContent(rawMessage: unknown) {
  const message = rawMessage as { content?: unknown } | null;
  const content = message?.content ?? rawMessage ?? "";
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object") {
          try {
            return JSON.stringify(part);
          } catch {
            return "";
          }
        }
        return String(part ?? "");
      })
      .join("\n");
  }

  if (content && typeof content === "object") {
    const contentObject = content as Record<string, unknown>;

    if (typeof contentObject.text === "string") {
      return contentObject.text;
    }

    try {
      return JSON.stringify(content);
    } catch {
      return "";
    }
  }

  return String(content ?? "");
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        {
          error: "OPENROUTER_API_KEY is not configured.",
          resp: "The trip planner API key is missing. Please configure OPENROUTER_API_KEY in your environment variables.",
          ui: "final",
        },
        { status: 503 },
      );
    }

    const body = (await req.json().catch(() => null)) as { messages?: unknown; isFinal?: boolean } | null;
    const { messages } = body ?? {};
    const isFinal = Boolean(body?.isFinal);

    // Safe authentication lookup
    let userEmail = "anonymous";
    let hasPremiumAccess = false;

    try {
      const user = await currentUser();
      userEmail = user?.primaryEmailAddress?.emailAddress ?? "anonymous";
      const authObj = await auth();
      if (authObj && typeof authObj.has === "function") {
        hasPremiumAccess = Boolean(authObj.has({ plan: "monthly" }));
      }
    } catch (authErr) {
      console.warn("Clerk auth check skipped:", authErr);
    }

    // Safe Arcjet protection lookup
    if (process.env.ARCJET_KEY) {
      try {
        const decision = await aj.protect(req, {
          userId: userEmail,
          requested: isFinal ? (hasPremiumAccess ? 0 : 5) : 0,
        });
        console.log("Arcjet decision:", decision);

        if (decision.isDenied() && !hasPremiumAccess) {
          return NextResponse.json(
            {
              error: "You have exceeded the daily limit of 5 requests. Please upgrade to a premium plan to continue.",
              resp: "You have exceeded the daily limit of 5 requests. Please upgrade to a premium plan to continue.",
              ui: "final",
            },
            { status: 429 },
          );
        }
      } catch (arcjetErr) {
        console.warn("Arcjet rate limit check skipped:", arcjetErr);
      }
    }

    if (!Array.isArray(messages) || messages.some((message) => {
      const entry = message as ChatMessage;
      return typeof entry?.role !== "string" || typeof entry?.content !== "string";
    })) {
      return NextResponse.json(
        { error: 'Invalid request payload', resp: 'Invalid request payload', ui: 'final' },
        { status: 400 },
      );
    }

    const normalizedMessages = messages as Array<{ role: "user" | "assistant"; content: string }>;
    const requestMessages: ChatCompletionMessageParam[] = normalizedMessages.map(
      (message): ChatCompletionMessageParam => ({
        role: message.role,
        content: message.content,
      }),
    );

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 1500,
      response_format: {
        type: "json_object",
      },
      messages: [
        { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
        ...requestMessages,
      ],
    });
    console.log("openai completion:", completion);

    const choice = completion?.choices?.[0] ?? null;
    const rawMessage = choice?.message ?? null;
    const contentStr = extractResponseContent(rawMessage);

    const parsedMessage = parseModelResponse(contentStr ?? "");
    if (!parsedMessage) {
      console.error("Failed to parse model response:", contentStr);
      return NextResponse.json(normalizeChatResponse(null, contentStr, isFinal));
    }

    if (isFinal) {
      const record = parsedMessage as Record<string, unknown>;

      return NextResponse.json({
        resp: "🎉 Your trip is ready!",
        trip_plan: record.trip_plan,
      });
    }

    return NextResponse.json(
      normalizeChatResponse(parsedMessage, contentStr, false) as NormalizedResponse
    );
  }
  catch (error) {
    console.error("/api/aimodel error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate AI response.";

    return NextResponse.json(
      {
        error: errorMessage,
        resp: "The AI trip generator encountered an issue. Please verify your OpenRouter API key and try again.",
        ui: "final",
      },
      { status: 500 },
    );
  }
}
