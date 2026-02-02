import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './lib/i18n';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if pathname starts with a locale
    const pathnameHasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect to default locale if no locale in path
    // Skip for static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // static files
    ) {
        return;
    }

    // Redirect to default locale
    return NextResponse.redirect(
        new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
    );
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico|.*\\.).*)'],
};
