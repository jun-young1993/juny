import { getEnv } from "./get-value.config";
import { GithubConfig, GithubObsidianConfig } from "./type.config";

export const URL = getEnv('NEXT_PUBLIC_API_URL','localhost:3000');
export const PROTOCOL = getEnv('NEXT_PUBLIC_API_PROTOCOL');
export const HOST_URL = `${PROTOCOL}://${URL}`;
export const API_URL = (path: string) => {
	return `${PROTOCOL}://${URL}/api${path}`;
}



export const GITHUB_API_URL: string = getEnv('NEXT_PUBLIC_GIT_HUB_API_URL');
export const GITHUB_OBSIDIAN_CONFIG: GithubObsidianConfig = {
	token: getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_TOKE'),
	owner: getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_OWNER'),
	repo:  getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_REPO'),
	version:  getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_API_VERSION'),
	email:  getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_EMAIL'),
	name:  getEnv('NEXT_PUBLIC_GIT_HUB_OBSIDIAN_NAME'),
}

export const GITHUB_CONFIG: GithubConfig = {
	token: getEnv('NEXT_PUBLIC_GIT_HUB_TOKE'),
	owner: getEnv('NEXT_PUBLIC_GIT_HUB_OWNER'),
	repo:  getEnv('NEXT_PUBLIC_GIT_HUB_REPO'),
	version:  getEnv('NEXT_PUBLIC_GIT_HUB_API_VERSION'),
	email:  getEnv('NEXT_PUBLIC_GIT_HUB_EMAIL'),
	name:  getEnv('NEXT_PUBLIC_GIT_HUB_NAME'),
}


export const GITHUB_URL = 'https://github.com';
export const MY_GITHUB_URL = `${GITHUB_URL}/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.owner}`

export const GITHUB_RAW_CONTENT_URL = 'https://raw.githubusercontent.com';