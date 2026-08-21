import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Comprehensive pools of high-resolution Unsplash photos categorized by keywords
const CATEGORY_POOLS: Record<string, string[]> = {
    rice: [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80"
    ],
    terrace: [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80"
    ],
    forest: [
        "https://images.unsplash.com/photo-1511497584788-876761c139ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80"
    ],
    monkey: [
        "https://images.unsplash.com/photo-1540573133985-780688d172e3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511497584788-876761c139ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
    ],
    jungle: [
        "https://images.unsplash.com/photo-1511497584788-876761c139ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80"
    ],
    temple: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    waterfall: [
        "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ],
    resort: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
    ],
    hotel: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    villa: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    beach: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    ],
    mall: [
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80"
    ],
    fountain: [
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
    ],
    tower: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    ],
    museum: [
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80"
    ],
    park: [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    ],
    restaurant: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    ],
    lake: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
    ],
    mountain: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80"
    ],
    default: [
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    ]
};

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function getFallbackPhoto(placeName: string): string {
    const lower = placeName.toLowerCase();
    for (const [key, urls] of Object.entries(CATEGORY_POOLS)) {
        if (key !== 'default' && lower.includes(key)) {
            const index = hashString(placeName) % urls.length;
            return urls[index];
        }
    }
    const defaults = CATEGORY_POOLS.default;
    const index = hashString(placeName) % defaults.length;
    return defaults[index];
}

async function fetchWikipediaImage(query: string): Promise<string | null> {
    if (!query) return null;
    try {
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages&format=json&pithumbsize=800`;
        const res = await axios.get(wikiUrl, { timeout: 4000 });
        const pages = res.data?.query?.pages;
        if (pages) {
            for (const pageId of Object.keys(pages)) {
                const src = pages[pageId]?.thumbnail?.source;
                // Exclude small icons or generic logos
                if (src && !src.endsWith(".svg") && !src.includes("symbol") && !src.includes("icon")) {
                    return src;
                }
            }
        }
    } catch {
        // ignore error and proceed
    }
    return null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const rawPlaceName = body.placeName || "";
        const destination = body.destination || "";

        // Clean place name (e.g., remove details after colon)
        const placeName = rawPlaceName.split(":")[0].trim();

        if (!placeName) {
            return NextResponse.json({ photoUrl: getFallbackPhoto(rawPlaceName) });
        }

        // 1. Try Google Places API (New) if key exists
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (apiKey && apiKey.startsWith("AIza")) {
            try {
                const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': apiKey,
                        'X-Goog-FieldMask': [
                            'places.photos',
                            'places.displayName',
                            'places.id'
                        ]
                    },
                    timeout: 4000
                };
                const result = await axios.post(BASE_URL, {
                    textQuery: destination ? `${placeName}, ${destination}` : placeName
                }, config);

                const placeRefName = result?.data?.places?.[0]?.photos?.[0]?.name;
                if (placeRefName) {
                    const photoUrl = `https://places.googleapis.com/v1/${placeRefName}/media?key=${apiKey}&maxHeightPx=600&maxWidthPx=800`;
                    return NextResponse.json({ photoUrl });
                }
            } catch (googleError: any) {
                // If Google Places fails (e.g. 403 Forbidden), fallback to Wikipedia search
                console.log("Google Places API notice (falling back to Wikipedia):", googleError?.response?.status || googleError?.message);
            }
        }

        // 2. Try Wikipedia Search API with multiple query variations
        const wikiQueries = [
            placeName,
            destination ? `${placeName} ${destination}` : "",
            placeName.replace(/s$/, "") // singular version e.g. Terraces -> Terrace
        ].filter(Boolean);

        for (const q of wikiQueries) {
            const wikiPhoto = await fetchWikipediaImage(q);
            if (wikiPhoto) {
                return NextResponse.json({ photoUrl: wikiPhoto });
            }
        }

        // 3. Category / hash fallback photo
        const fallback = getFallbackPhoto(placeName);
        return NextResponse.json({ photoUrl: fallback });

    } catch (error: any) {
        console.error("Error in place detail route:", error);
        return NextResponse.json({ photoUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" });
    }
}

