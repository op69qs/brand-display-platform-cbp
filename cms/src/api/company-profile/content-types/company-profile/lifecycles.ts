/**
 * Lifecycle hooks for company-profile
 * Ensures only one company profile per language
 */

import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

type LanguageType = 'zh' | 'en' | 'ru';

const languageNames: Record<LanguageType, string> = {
    zh: '中文',
    en: 'English',
    ru: 'Русский',
};

export default {
    async beforeCreate(event: { params: { data: { language?: string } } }) {
        const { data } = event.params;

        if (data.language) {
            const lang = data.language as LanguageType;
            // Check if a record with the same language already exists
            const existingRecords = await strapi.documents('api::company-profile.company-profile').findMany({
                filters: { language: lang },
            });

            if (existingRecords.length > 0) {
                const langName = languageNames[lang] || lang;
                throw new ApplicationError(
                    `${langName} 语言的公司简介已存在，请编辑现有记录而非创建新记录。`
                );
            }
        }
    },

    async beforeUpdate(event: { params: { documentId: string; data: { language?: string } } }) {
        const { documentId, data } = event.params;

        if (data.language) {
            const lang = data.language as LanguageType;
            // Check if another record with the same language exists (excluding current record)
            const existingRecords = await strapi.documents('api::company-profile.company-profile').findMany({
                filters: { language: lang },
            });

            // Filter out the current record being updated
            const conflictingRecords = existingRecords.filter(
                (record: { documentId: string }) => record.documentId !== documentId
            );

            if (conflictingRecords.length > 0) {
                const langName = languageNames[lang] || lang;
                throw new ApplicationError(
                    `${langName} 语言的公司简介已存在，每种语言只能有一条记录。`
                );
            }
        }
    },
};
