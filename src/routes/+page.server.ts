import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

type Response<T> = {
	message: string;
	status: boolean;
	data: T;
};

type Metadata = {
	totalProjects: number;
	totalSeasons: number;
	creators: string[];
	links: string[];
	episodes: string[];
	seasonStats: {
		season: number;
		count: number;
	}[];
	earliestDate: string;
	latestDate: string;
};

type Project = {
	season: number;
	count: number;
	weeks: {
		date: string;
		projects: {
			id: string;
			identifier: string;
			order: number;
			branch: string;
			season: number;
			date: string;
			creator: string | null;
			link: string;
			description: string;
			screenshot: string | null;
			creator_lower: string | null;
			created_at: string;
			updated_at: string | null;
		}[];
	}[];
};

const apiUrl = env.PUBLIC_SHOWCASE_API;

export const load: PageServerLoad = async ({ url, fetch }) => {
	const search = url.searchParams.get('search') || '';
	const season = url.searchParams.get('season') || 5;

	const responseMetadata = await fetch(`${apiUrl}/api/metadata`);

	const meta: Response<Metadata> = await responseMetadata.json();

	const responseProject = await fetch(`${apiUrl}/api/projects?search=${search}&season=${season}`);

	const projectsPromise: Promise<Response<Project>> = responseProject.json();

	return { meta, projectsPromise: projectsPromise, search, season, apiUrl };
};
