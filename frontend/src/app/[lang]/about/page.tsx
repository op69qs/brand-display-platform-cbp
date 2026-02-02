import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { getCompanyProfiles } from '@/lib/strapi';
import { Metadata } from 'next';

type Params = { lang: string };

interface AboutPageProps {
    params: Promise<Params>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;
    return {
        title: `${t(locale, 'aboutUs')} - CBP`,
    };
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;
    const locale = lang as Locale;

    // Try to fetch company profile
    let content = '';
    try {
        const data = await getCompanyProfiles(locale);
        if (data.data.length > 0) {
            content = data.data[0].content as string;
        }
    } catch {
        // CMS not available
    }

    return (
        <div className="py-16">
            {/* Hero */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{t(locale, 'aboutUs')}</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {content ? (
                        <div className="rich-text prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <div className="space-y-6 text-gray-700">
                            <p className="text-lg leading-relaxed">
                                Central Asia Broiler & Processing U:C (CBP) is based in Kyrgyzstan
                                and specializes in broiler farming, slaughtering, cold chain logistics and export.
                            </p>
                            <p className="leading-relaxed">
                                Our state-of-the-art facilities ensure the highest quality standards for our products,
                                meeting international certifications including HACCP and GACC requirements.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                <div className="bg-gray-100 p-6 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-red-600">2018</div>
                                    <div className="text-sm text-gray-600 mt-1">Founded</div>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-red-600">500+</div>
                                    <div className="text-sm text-gray-600 mt-1">Employees</div>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-red-600">10M+</div>
                                    <div className="text-sm text-gray-600 mt-1">Birds/Year</div>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-red-600">5+</div>
                                    <div className="text-sm text-gray-600 mt-1">Countries</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
