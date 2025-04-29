import { getOriginalUrl } from '$lib/services/urlService';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { shortCode } = params;
    const originalUrl = await getOriginalUrl(shortCode);

    if (!originalUrl) {
        throw error(404, 'URL no encontrada');
    }

    throw redirect(302, originalUrl);
}; 