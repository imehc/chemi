import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./config";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// TODO: https://github.com/nextauthjs/next-auth/issues/9536#issuecomment-1880180450
// export { auth as middleware } from "～/auth"

// Initialize the rate limiter
// https://dev.to/sh20raj/how-to-add-rate-limiting-to-your-nextjs-app-router-22fa
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
})

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
  localePrefix: "as-needed",
});

export default async function middleware(req: NextRequest) {
  try {
    // Consume a point for each request
    await rateLimiter.consume(req.ip as string);
    // TODO: 处理auth
    return intlMiddleware(req);
  } catch (error) {
    // If rate limit is exceeded, send a 429 response
    return new NextResponse('Too many requests', { status: 429 });
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(de|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // TODO: 保护部分页面
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
