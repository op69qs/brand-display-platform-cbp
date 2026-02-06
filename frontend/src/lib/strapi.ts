const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

interface StrapiItem {
    id: number;
    documentId: string;
    [key: string]: unknown;
}

/**
 * Fetch data from Strapi API
 */
async function fetchStrapi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<StrapiResponse<T>> {
    const url = `${STRAPI_URL}/api${endpoint}`;

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error(`[Strapi] Fetch failed for ${url}:`, error);
        throw error;
    }
}

/**
 * Get company profiles by language
 */
export async function getCompanyProfiles(language: string) {
    return fetchStrapi<StrapiItem[]>(
        `/company-profiles?filters[language][$eq]=${language}&populate=*`
    );
}


/**
 * Get news list by language
 */
export async function getNewsList(language: string, limit?: number) {
    const params = new URLSearchParams({
        'locale': language,
        'sort[0]': 'publish_date:desc',
        'populate': '*',
    });
    if (limit) {
        params.set('pagination[limit]', limit.toString());
    }
    // API endpoint: /api/news (plural form from user's News model)
    return fetchStrapi<StrapiItem[]>(`/news?${params.toString()}`);
}

/**
 * Get single news by slug
 */
export async function getNewsBySlug(slug: string, language: string) {
    return fetchStrapi<StrapiItem[]>(
        `/news?filters[slug][$eq]=${slug}&locale=${language}&populate=*`
    );
}

/**
 * Get products by language
 */
export async function getProducts(language: string) {
    return fetchStrapi<StrapiItem[]>(
        `/products?locale=${language}&sort[0]=sort_order:asc&populate=*`
    );
}

/**
 * Submit contact message
 */
export async function submitContactMessage(data: {
    name: string;
    email?: string;
    phone?: string;
    message: string;
    language: string;
}) {
    const res = await fetch(`${STRAPI_URL}/api/contact-messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });

    if (!res.ok) {
        throw new Error('Failed to submit message');
    }

    return res.json();
}

export { STRAPI_URL };
