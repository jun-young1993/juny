export interface GithubConfig {
	token: string
	owner: string
	repo: string
	version: string
	email: string
	name: string
}
export interface GithubObsidianConfig extends GithubConfig{};