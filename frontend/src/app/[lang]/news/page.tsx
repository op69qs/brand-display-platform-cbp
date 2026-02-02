import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { getNewsList } from '@/lib/strapi';
import { Metadata } from 'next';

type Params = { lang: string };

interface NewsPageProps {
    params: Promise<Params>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;
    return {
        title: `${t(locale, 'newsUpdates')} - CBP`,
    };
}

export default async function NewsPage({ params }: NewsPageProps) {
    const { lang } = await params;
    const locale = lang as Locale;

    // Try to fetch news
    let news: Array<{
        id: number;
        title: string;
        slug: string;
        summary?: string;
        publish_date: string
    }> = [];
    try {
        const data = await getNewsList(locale);
        if (data.data) {
            news = data.data.map((item) => ({
                id: item.id,
                title: item.title as string,
                slug: item.slug as string,
                summary: item.summary as string | undefined,
                publish_date: item.publish_date as string,
            }));
        }
    } catch (error) {
        console.warn('[NewsPage] Failed to fetch news (using fallback):', error instanceof Error ? error.message : error);
    }

    // Default news for demo
    const defaultNews = [
        {
            id: 1,
            title: 'First Shipment of Chicken Meat',
            slug: 'first-shipment',
            summary: 'CBP successfully completed its first shipment of premium chicken meat to international markets.',
            publish_date: '2024-04-15',
        },
        {
            id: 2,
            title: 'CBP Launches New Deep Processing Facility',
            slug: 'new-facility',
            summary: 'Our new state-of-the-art deep processing facility is now operational.',
            publish_date: '2024-04-01',
        },
        {
            id: 3,
            title: 'GACC Certification Achieved',
            slug: 'gacc-certification',
            summary: 'CBP has successfully obtained GACC certification for export to China.',
            publish_date: '2024-03-20',
        },
    ];

    const displayNews = news.length > 0 ? news : defaultNews;

    return (
        <div className="py-16">
            {/* Hero */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{t(locale, 'newsUpdates')}</h1>
                </div>
            </section>

            {/* News List */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-8">
                        {displayNews.map((item) => (
                            <article
                                key={item.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="md:flex">
                                    <div className="md:w-1/3 aspect-video md:aspect-auto bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">News Image</span>
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <p className="text-sm text-gray-500 mb-2">{item.publish_date}</p>
                                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                                            <Link
                                                href={`/${locale}/news/${item.slug}`}
                                                className="hover:text-red-600 transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </h2>
                                        {item.summary && (
                                            <p className="text-gray-600">{item.summary}</p>
                                        )}
                                        <Link
                                            href={`/${locale}/news/${item.slug}`}
                                            className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium text-sm"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
