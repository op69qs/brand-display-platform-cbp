/**
 * Lifecycle hooks for company-profile
 * Ensures only one company profile per language
 */

type LanguageType = 'zh' | 'en' | 'ru';

export default {
    async beforeCreate(event: { params: { data: { language?: string } } }) {
        const { data } = event.params;

        if (data.language) {
            // Check if a record with the same language already exists
            const existingRecords = await strapi.documents('api::company-profile.company-profile').findMany({
                filters: { language: data.language as LanguageType },
            });

            if (existingRecords.length > 0) {
                throw new Error(
                    `A company profile for language "${data.language}" already exists. ` +
                    `Please edit the existing record instead of creating a new one.`
                );
            }
        }
    },

    async beforeUpdate(event: { params: { documentId: string; data: { language?: string } } }) {
        const { documentId, data } = event.params;

        if (data.language) {
            // Check if another record with the same language exists (excluding current record)
            const existingRecords = await strapi.documents('api::company-profile.company-profile').findMany({
                filters: { language: data.language as LanguageType },
            });

            // Filter out the current record being updated
            const conflictingRecords = existingRecords.filter(
                (record: { documentId: string }) => record.documentId !== documentId
            );

            if (conflictingRecords.length > 0) {
                throw new Error(
                    `Another company profile for language "${data.language}" already exists. ` +
                    `Each language can only have one company profile.`
                );
            }
        }
    },
};
