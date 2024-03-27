import { getEnv } from "./get-value.config";
import { GithubObsidianConfig } from "./type.config";

export const GITHUB_API_URL: string = getEnv('GIT_HUB_API_URL');
export const GITHUB_OBSIDIAN_CONFIG: GithubObsidianConfig = {
	token: getEnv('GIT_HUB_OBSIDIAN_TOKE'),
	owner: getEnv('GIT_HUB_OBSIDIAN_OWNER'),
	repo:  getEnv('GIT_HUB_OBSIDIAN_REPO'),
	version:  getEnv('GIT_HUB_OBSIDIAN_API_VERSION'),
	email:  getEnv('GIT_HUB_OBSIDIAN_EMAIL'),
	name:  getEnv('GIT_HUB_OBSIDIAN_NAME'),
}