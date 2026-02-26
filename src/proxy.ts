import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n/config";

function detectBrowserLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return i18n.defaultLocale;

  return acceptLanguage.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = i18n.locales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );

  const cookieLocale = request.cookies.get("locale")?.value;

  if (pathnameHasLocale) {
    const response = NextResponse.next();

    const currentLocale = pathname.split("/")[1];
    response.cookies.set("locale", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  const locale = cookieLocale || detectBrowserLocale(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
