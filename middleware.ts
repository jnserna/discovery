// next-intl: locale is managed via cookie (no URL prefix)
// This middleware is a pass-through — locale is set via server actions.
export default function middleware() {
  // No-op: locale resolved in lib/i18n/config.ts via cookie
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
