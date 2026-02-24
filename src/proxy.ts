import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n/config";

function detectBrowserLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return i18n.defaultLocale;

  return acceptLanguage.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ignore next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // check if locale already exists in URL
  const pathnameHasLocale = i18n.locales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  // ⭐ read cookie
  const cookieLocale = request.cookies.get("locale")?.value;

  if (pathnameHasLocale) {
    const response = NextResponse.next();

    // ⭐ SAVE locale to cookie
    const currentLocale = pathname.split("/")[1];
    response.cookies.set("locale", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }

  // use cookie if exists
  const locale = cookieLocale || detectBrowserLocale(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};