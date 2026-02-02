import type { StrapiApp } from '@strapi/strapi/admin';

import zhHans from './translations/zh-Hans.json';
import Logo from './extensions/logo.png';

export default {
    config: {
        locales: [
            'zh-Hans',  // 简体中文
            'zh',       // 中文
            'ru',       // 俄语
        ],
        translations: {
            'zh-Hans': zhHans,
        },
        // Custom logo configuration
        auth: {
            logo: Logo,
        },
        menu: {
            logo: Logo,
        },
    },
    bootstrap(app: StrapiApp) {
        console.log(app);

        // Remove paid feature links from settings
        // Note: The specific IDs might vary, this covers common ones
        const linksToRemove = [
            'content-history',
            'releases',
            'review-workflows',
            'sso',
            'audit-logs'
        ];

        // Strapi v5 often puts settings in app.settings.global or app.settings.admin
        if (app.settings && app.settings.global && app.settings.global.links) {
            app.settings.global.links = app.settings.global.links.filter((link: any) =>
                !linksToRemove.some(id => link.id.includes(id) || link.to.includes(id))
            );
        }
    },
};
