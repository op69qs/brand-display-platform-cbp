import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import ContactForm from '@/components/ContactForm';
import { getCompanyProfiles } from '@/lib/strapi';
import { Metadata } from 'next';

type Params = { lang: string };

interface ContactPageProps {
    params: Promise<Params>;
}

// Default contact info fallback
const defaultContactInfo = {
    address: 'Bishkek, Kyrgyzstan',
    email: 'info@cbp.kg',
    phone: '+996 XXX XXX XXX',
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;
    return {
        title: `${t(locale, 'contactUs')} - CBP`,
    };
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { lang } = await params;
    const locale = lang as Locale;

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
        console.warn('[ContactPage] Failed to fetch contact info, using defaults:', error);
    }

    return (
        <div className="py-16">
            {/* Hero */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{t(locale, 'contactUs')}</h1>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t(locale, 'address')}</h3>
                                        <p className="text-gray-600 mt-1">{contactInfo.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t(locale, 'email')}</h3>
                                        <p className="text-gray-600 mt-1">{contactInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t(locale, 'phone')}</h3>
                                        <p className="text-gray-600 mt-1">{contactInfo.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map placeholder */}
                            <div className="mt-8 bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                                <span className="text-gray-500">Map</span>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">{t(locale, 'yourMessage')}</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <ContactForm locale={locale} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
