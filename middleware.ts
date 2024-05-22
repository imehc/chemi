import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./config";
import { NextRequest } from "next/server";

// TODO: https://github.com/nextauthjs/next-auth/issues/9536#issuecomment-1880180450
// export { auth as middleware } from "～/auth"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
  localePrefix: "as-needed",
});

export default async function middleware(req: NextRequest) {
  // TODO: 处理auth
  return intlMiddleware(req);
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
