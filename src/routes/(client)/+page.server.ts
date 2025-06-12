import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const search = url.searchParams.get('search') || '';
	const season = url.searchParams.get('season') || 1;

	const responseMetadata = await fetch(`${env.SHOWCASE_API}/api/metadata`);

	const meta = await responseMetadata.json();

	const responseProject = await fetch(
		`${env.SHOWCASE_API}/api/projects?search=${search}&season=${season}`
	);

	const projectsPromise = responseProject.json();

	return { meta, projectsPromise: projectsPromise, search, season };
};
