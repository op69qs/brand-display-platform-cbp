import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { getNewsList } from '@/lib/strapi';

type Params = { lang: string };

interface HomePageProps {
    params: Promise<Params>;
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const locale = lang as Locale;

    // Try to fetch news, fallback to empty array if CMS not available
    let news: Array<{ id: number; title: string; publish_date: string; summary?: string }> = [];
    try {
        const newsData = await getNewsList(locale, 2);
        if (newsData.data && newsData.data.length > 0) {
            news = newsData.data.map((item) => ({
                id: item.id,
                title: item.title as string,
                publish_date: item.publish_date as string,
                summary: item.summary as string | undefined,
            }));
        }
    } catch (error) {
        console.warn('[HomePage] Failed to fetch news from Strapi (using fallback):', error instanceof Error ? error.message : error);
        // CMS not available, use empty array
    }

    // Business items
    const businessItems = [
        { key: 'broilerSlaughter', image: '/images/slaughter.jpg' },
        { key: 'exportPoultry', image: '/images/export.jpg' },
        { key: 'farmingBase', image: '/images/farming.jpg' },
        { key: 'deepProcessing', image: '/images/processing.jpg' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
                        {t(locale, 'heroTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8">
                        {t(locale, 'heroSubtitle')}
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 bg-amber-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-amber-200">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{t(locale, 'modernSlaughterhouse')}</h3>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-amber-100 rounded-lg p-6 shadow-sm text-center border border-amber-300">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{t(locale, 'exportGlobally')}</h3>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-amber-200">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{t(locale, 'verticallyIntegrated')}</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="text-gray-800">{t(locale, 'aboutUs')}</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Central Asia Broiler & Processing U:C (CBP) is based in Kyrgyzstan
                                and specializes in broiler farming, slaughtering, cold chain logistics and export.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-gray-500 text-center">HACCP</span>
                                </div>
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-gray-500 text-center">GACC READY</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                            <span className="text-gray-500">Company Image</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        <span className="text-gray-800">{t(locale, 'ourBusiness')}</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {businessItems.map((item) => (
                            <div key={item.key} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">{t(locale, item.key)}</span>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-medium text-gray-800 text-sm">{t(locale, item.key)}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                            <span className="text-gray-500">World Map</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="text-gray-800">{t(locale, 'newsUpdates')}</span>
                            </h2>
                            {news.length > 0 ? (
                                <div className="space-y-4">
                                    {news.map((item) => (
                                        <div key={item.id} className="border-b pb-4">
                                            <p className="text-sm text-gray-500 mb-1">{item.publish_date}</p>
                                            <h3 className="font-medium text-gray-800">{item.title}</h3>
                                            {item.summary && (
                                                <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="border-b pb-4">
                                        <p className="text-sm text-gray-500 mb-1">Apr 2024</p>
                                        <h3 className="font-medium text-gray-800">First Shipment of Chicken Meat</h3>
                                    </div>
                                    <div className="border-b pb-4">
                                        <p className="text-sm text-gray-500 mb-1">Apr 2024</p>
                                        <h3 className="font-medium text-gray-800">CBP Launches New Deep Processing Facility</h3>
                                    </div>
                                </div>
                            )}
                            <Link
                                href={`/${locale}/news`}
                                className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium"
                            >
                                {t(locale, 'news')} →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
