import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  /^\/dashboard(.*)/,
  /^\/create-new-trip(.*)/,
  /^\/ai-planner(.*)/,
  /^\/destinations(.*)/,
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
}, { clockSkewInMs: 60000 });

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|webp|ico|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Clerk frontend API routes
    "/__clerk/(.*)",
  ],
};