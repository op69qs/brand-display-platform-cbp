import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { getProducts } from '@/lib/strapi';
import { Metadata } from 'next';

type Params = { lang: string };

interface BusinessPageProps {
    params: Promise<Params>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;
    return {
        title: `${t(locale, 'ourBusiness')} - CBP`,
    };
}

export default async function BusinessPage({ params }: BusinessPageProps) {
    const { lang } = await params;
    const locale = lang as Locale;

    // Try to fetch products
    let products: Array<{ id: number; product_name: string; description?: string }> = [];
    try {
        const data = await getProducts(locale);
        products = data.data.map((item) => ({
            id: item.id,
            product_name: item.product_name as string,
            description: item.description as string | undefined,
        }));
    } catch {
        // CMS not available
    }

    // Default business items
    const businessItems = [
        {
            key: 'broilerSlaughter',
            description: {
                zh: '专业的肉鸡屠宰加工服务，采用现代化设备和严格的卫生标准。',
                en: 'Professional broiler slaughter and processing services with modern equipment and strict hygiene standards.',
                ru: 'Профессиональные услуги по убою и переработке бройлеров с современным оборудованием.',
            },
        },
        {
            key: 'exportPoultry',
            description: {
                zh: '活禽出口服务，符合国际检疫标准。',
                en: 'Live poultry export services meeting international quarantine standards.',
                ru: 'Экспорт живой птицы, соответствующий международным карантинным стандартам.',
            },
        },
        {
            key: 'farmingBase',
            description: {
                zh: '自有养殖基地，实现从养殖到加工的垂直整合。',
                en: 'Our own farming base, achieving vertical integration from farming to processing.',
                ru: 'Собственная ферма, обеспечивающая вертикальную интеграцию от выращивания до переработки.',
            },
        },
        {
            key: 'deepProcessing',
            description: {
                zh: '深加工产品线，包括调理食品和即食产品。',
                en: 'Deep processing product line, including prepared foods and ready-to-eat products.',
                ru: 'Линия глубокой переработки, включая полуфабрикаты и готовую продукцию.',
            },
        },
    ];

    return (
        <div className="py-16">
            {/* Hero */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{t(locale, 'ourBusiness')}</h1>
                </div>
            </section>

            {/* Business Items */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {businessItems.map((item, index) => (
                            <div
                                key={item.key}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">{t(locale, item.key)}</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800">{t(locale, item.key)}</h3>
                                    </div>
                                    <p className="text-gray-600">{item.description[locale]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products from CMS */}
            {products.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg mb-2">{product.product_name}</h3>
                                    {product.description && (
                                        <div
                                            className="text-gray-600 text-sm rich-text"
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
