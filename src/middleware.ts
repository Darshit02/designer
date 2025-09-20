import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
import { isBypassRoute, isProtectedRoute, isPublicRoute } from "./lib/permissions";

const publicMatcher = createRouteMatcher(isPublicRoute);
const bypassMatcher = createRouteMatcher(isBypassRoute);
const protectedMatcher = createRouteMatcher(isProtectedRoute);

export default convexAuthNextjsMiddleware(
    async (request, { convexAuth }) => {
        // First check if route should bypass middleware completely
        if (bypassMatcher(request)) {
            return;
        }
        
        const authed = await convexAuth.isAuthenticated();
        
        // Redirect authenticated users away from public routes (like login pages)
        if (publicMatcher(request) && authed) {
            return nextjsMiddlewareRedirect(request, "/dashboard");
        }
        
        // Redirect unauthenticated users away from protected routes
        if (protectedMatcher(request) && !authed) {
            return nextjsMiddlewareRedirect(request, "/auth/sign-in");
        }
        
        // Allow request to proceed normally
        return;
    }, 
    { cookieConfig: { maxAge: 60 * 60 * 24 * 7 } } // 7 days
);

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};