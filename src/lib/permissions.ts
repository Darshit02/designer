export const isPublicRoute = [
    "/auth(.*)",
    "/"
];

export const isProtectedRoute = [
    "/dashboard(.*)",
];

export const isBypassRoute = [
   "/api/polar/webhook",
   "/api/inngest(.*)",
   "/api/auth(.*)",
   "/convex(.*)"
];