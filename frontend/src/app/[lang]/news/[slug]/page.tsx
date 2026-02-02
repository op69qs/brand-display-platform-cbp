import { Locale } from '@/lib/i18n';
import { getNewsBySlug } from '@/lib/strapi';
import { Metadata } from 'next';
import Link from 'next/link';

type Params = { lang: string; slug: string };

interface NewsDetailPageProps {
    params: Promise<Params>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug} - CBP News`,
    };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { lang, slug } = await params;
    const locale = lang as Locale;

    // Try to fetch news by slug
    let news: { title: string; content: string; publish_date: string } | null = null;
    try {
        const data = await getNewsBySlug(slug, locale);
        if (data.data && data.data.length > 0) {
            const item = data.data[0];
            news = {
                title: item.title as string,
                content: item.content as string,
                publish_date: item.publish_date as string,
            };
        }
    } catch (error) {
        console.warn(`[NewsDetailPage] Failed to fetch news "${slug}" (using fallback):`, error instanceof Error ? error.message : error);
    }

    return (
        <div className="py-16">
            {/* Back link */}
            <section className="bg-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <Link
                        href={`/${locale}/news`}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                        ← Back to News
                    </Link>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    {news ? (
                        <article>
                            <p className="text-sm text-gray-500 mb-2">{news.publish_date}</p>
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">{news.title}</h1>
                            <div
                                className="rich-text prose prose-lg"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />
                        </article>
                    ) : (
                        <article>
                            <p className="text-sm text-gray-500 mb-2">2024-04-15</p>
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                                {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h1>
                            <div className="prose prose-lg text-gray-700">
                                <p>
                                    This is a placeholder content for the news article.
                                    When connected to Strapi CMS, the actual content will be displayed here.
                                </p>
                                <p>
                                    Please add content through the Strapi admin panel to see the full article.
                                </p>
                            </div>
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
}
