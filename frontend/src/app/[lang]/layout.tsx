import type { Metadata } from "next";
import { Noto_Sans_SC, Roboto } from "next/font/google";
import "../globals.css";
import { i18n, Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansSC = Noto_Sans_SC({
    variable: "--font-noto-sans-sc",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "700"],
});

type Params = { lang: string };

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;

    const titles: Record<Locale, string> = {
        zh: "CBP - 中亚优质禽肉出口",
        en: "CBP - Premium Poultry from Central Asia",
        ru: "CBP - Премиальная птица из Центральной Азии",
    };

    const descriptions: Record<Locale, string> = {
        zh: "Central Asia Broiler & Processing - 来自吉尔吉斯斯坦的优质鸡肉，专业从事肉鸡养殖、屠宰、冷链物流及出口",
        en: "Central Asia Broiler & Processing - Premium poultry from Kyrgyzstan, specializing in broiler farming, slaughtering, cold chain logistics and export",
        ru: "Central Asia Broiler & Processing - Премиальная птица из Кыргызстана, специализируемся на выращивании бройлеров, убое, холодильной логистике и экспорте",
    };

    return {
        title: titles[locale] || titles.zh,
        description: descriptions[locale] || descriptions.zh,
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<Params>;
}) {
    const { lang } = await params;
    const locale = lang as Locale;

    return (
        <html lang={lang}>
            <body className={`${notoSansSC.variable} ${roboto.variable} font-sans antialiased`}>
                <Header locale={locale} />
                <main className="min-h-screen pt-16">{children}</main>
                <Footer locale={locale} />
            </body>
        </html>
    );
}
