import { getEnv } from "./get-value.config";
import { GithubConfig, GithubObsidianConfig } from "./type.config";

export const URL = getEnv('VERCEL_URL','localhost:3000');
export const PROTOCOL = getEnv('NEXT_PUBLIC_API_PROTOCOL');
export const API_URL = (path: string) => {
	return `${PROTOCOL}${URL}/api${path}`;
}



export const GITHUB_API_URL: string = getEnv('GIT_HUB_API_URL');
export const GITHUB_OBSIDIAN_CONFIG: GithubObsidianConfig = {
	token: getEnv('GIT_HUB_OBSIDIAN_TOKE'),
	owner: getEnv('GIT_HUB_OBSIDIAN_OWNER'),
	repo:  getEnv('GIT_HUB_OBSIDIAN_REPO'),
	version:  getEnv('GIT_HUB_OBSIDIAN_API_VERSION'),
	email:  getEnv('GIT_HUB_OBSIDIAN_EMAIL'),
	name:  getEnv('GIT_HUB_OBSIDIAN_NAME'),
}
export const GITHUB_CONFIG: GithubConfig = {
	token: getEnv('GIT_HUB_TOKE'),
	owner: getEnv('GIT_HUB_OWNER'),
	repo:  getEnv('GIT_HUB_REPO'),
	version:  getEnv('GIT_HUB_API_VERSION'),
	email:  getEnv('GIT_HUB_EMAIL'),
	name:  getEnv('GIT_HUB_NAME'),
}

