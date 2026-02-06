import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { getCompanyProfiles } from '@/lib/strapi';

interface FooterProps {
    locale: Locale;
}

// Default contact info fallback
const defaultContactInfo = {
    address: 'Bishkek, Kyrgyzstan',
    email: 'info@cbp.kg',
    phone: '+996 XXX XXX XXX',
};

export default async function Footer({ locale }: FooterProps) {
    // Fetch company profile for contact info
    let contactInfo = defaultContactInfo;
    try {
        const response = await getCompanyProfiles(locale);
        if (response.data && response.data.length > 0) {
            const profile = response.data[0];
            contactInfo = {
                address: (profile.address as string) || defaultContactInfo.address,
                email: (profile.email as string) || defaultContactInfo.email,
                phone: (profile.phone as string) || defaultContactInfo.phone,
            };
        }
    } catch (error) {
        console.warn('[Footer] Failed to fetch contact info, using defaults:', error);
    }

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.png"
                                alt="CBP Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-xl font-bold">Central Asia Broiler & Processing</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Central Asia Broiler & Processing U:C (CBP) is based in Kyrgyzstan
                            and specializes in broiler farming, slaughtering, cold chain logistics and export.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                                    {t(locale, 'home')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                                    {t(locale, 'about')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/business`} className="hover:text-white transition-colors">
                                    {t(locale, 'business')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/news`} className="hover:text-white transition-colors">
                                    {t(locale, 'news')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">{t(locale, 'contactUs')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{contactInfo.email}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{contactInfo.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    {t(locale, 'copyright')}
                </div>
            </div>
        </footer>
    );
}
