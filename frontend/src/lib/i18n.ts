export const i18n = {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
    zh: '中文',
    en: 'English',
    ru: 'Русский',
};
