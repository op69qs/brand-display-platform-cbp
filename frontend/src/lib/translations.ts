import { Locale } from './i18n';

// UI translations for static text
export const translations: Record<Locale, Record<string, string>> = {
    zh: {
        // Navigation
        home: '首页',
        about: '关于我们',
        business: '业务与服务',
        news: '新闻中心',
        contact: '联系我们',

        // Hero Section
        heroTitle: '从中亚迈向世界',
        heroSubtitle: '来自吉尔吉斯斯坦的优质鸡肉',

        // Features
        modernSlaughterhouse: '现代化厂房屠宰加工',
        exportGlobally: '符合GACC认证出口中国及全球',
        verticallyIntegrated: '原料、加工、设证',

        // About
        aboutUs: '关于我们',

        // Business
        ourBusiness: '业务与服务',
        broilerSlaughter: '肉鸡屠宰加工',
        exportPoultry: '活禽出口',
        farmingBase: '养殖基地',
        deepProcessing: '深加工产品',

        // News
        newsUpdates: '新闻中心',

        // Contact
        contactUs: '联系我们',
        yourName: '您的姓名',
        yourEmail: '您的邮箱',
        yourPhone: '您的电话',
        yourMessage: '留言内容',
        submit: '提交',
        submitSuccess: '提交成功',
        submitError: '提交失败，请重试',

        // Footer
        copyright: '© 2024 CBP. 版权所有.',
        address: '地址',
        phone: '电话',
        email: '邮箱',
    },
    en: {
        // Navigation
        home: 'Home',
        about: 'About Us',
        business: 'Our Business',
        news: 'News',
        contact: 'Contact Us',

        // Hero Section
        heroTitle: 'From Central Asia to the World',
        heroSubtitle: 'Premium Poultry from Kyrgyzstan',

        // Features
        modernSlaughterhouse: 'Modern Slaughterhouse',
        exportGlobally: 'Export to China and Globally',
        verticallyIntegrated: 'Vertically Integrated Farming',

        // About
        aboutUs: 'About Us',

        // Business
        ourBusiness: 'Our Business',
        broilerSlaughter: 'Broiler Slaughter & Processing',
        exportPoultry: 'Export of Poultry',
        farmingBase: 'Farming Base',
        deepProcessing: 'Further Processed Products',

        // News
        newsUpdates: 'News & Updates',

        // Contact
        contactUs: 'Contact Us',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourPhone: 'Your Phone',
        yourMessage: 'Your Message',
        submit: 'Submit',
        submitSuccess: 'Message sent successfully',
        submitError: 'Failed to send message, please try again',

        // Footer
        copyright: '© 2024 CBP. All rights reserved.',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
    },
    ru: {
        // Navigation
        home: 'Главная',
        about: 'О нас',
        business: 'Наш бизнес',
        news: 'Новости',
        contact: 'Контакты',

        // Hero Section
        heroTitle: 'Из Центральной Азии в мир',
        heroSubtitle: 'Индустриальное производство и экспорт мяса птицы из Кыргызстана',

        // Features
        modernSlaughterhouse: 'Современный перерабатывающий комплекс',
        exportGlobally: 'Экспорт в Китай и другие страны мира',
        verticallyIntegrated: 'Вертикально интегрированное хозяйство',

        // About
        aboutUs: 'О нас',

        // Business
        ourBusiness: 'Наш бизнес',
        broilerSlaughter: 'Убой и переработка бройлеров',
        exportPoultry: 'Экспорт птицы',
        farmingBase: 'Ферма',
        deepProcessing: 'Глубокая переработка',

        // News
        newsUpdates: 'Новости и обновления',

        // Contact
        contactUs: 'Свяжитесь с нами',
        yourName: 'Ваше имя',
        yourEmail: 'Ваш email',
        yourPhone: 'Ваш телефон',
        yourMessage: 'Ваше сообщение',
        submit: 'Отправить',
        submitSuccess: 'Сообщение отправлено',
        submitError: 'Ошибка отправки, попробуйте снова',

        // Footer
        copyright: '© 2024 CBP. Все права защищены.',
        address: 'Адрес',
        phone: 'Телефон',
        email: 'Email',
    },
};

export function t(locale: Locale, key: string): string {
    return translations[locale][key] || key;
}
