'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Locale, localeNames, i18n } from '@/lib/i18n';
import { t } from '@/lib/translations';

interface HeaderProps {
    locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { key: 'home', href: `/${locale}` },
        { key: 'about', href: `/${locale}/about` },
        { key: 'business', href: `/${locale}/business` },
        { key: 'news', href: `/${locale}/news` },
        { key: 'contact', href: `/${locale}/contact` },
    ];

    // Switch language URL
    const getLocalePath = (newLocale: Locale) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        return segments.join('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo - Larger size with overhang effect */}
                <Link href={`/${locale}`} className="flex items-center gap-2 relative">
                    <Image
                        src="/logo.png"
                        alt="CBP Logo"
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain -mb-4 md:-mb-6"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-red-600 ${pathname === item.href ? 'text-red-600' : 'text-gray-700'
                                }`}
                        >
                            {t(locale, item.key)}
                        </Link>
                    ))}
                </div>

                {/* Language Switcher - Always visible */}
                <div className="flex items-center gap-1 md:gap-2">
                    {i18n.locales.map((loc) => (
                        <Link
                            key={loc}
                            href={getLocalePath(loc)}
                            className={`px-1.5 md:px-2 py-1 text-xs rounded ${locale === loc
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {localeNames[loc]}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="container mx-auto px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`block py-2 text-sm font-medium ${pathname === item.href ? 'text-red-600' : 'text-gray-700'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t(locale, item.key)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
