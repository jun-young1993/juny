import { GithubContentInterface } from "@/types/github.type";
import { GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG } from "../config/config";
import { NotFoundApiException } from "@/exceptions/not-found-api.exception";
import { constants } from "http2";
export async function GithubObsidianClient<T>(url: string) : Promise<T>
{
	const res = await fetch(url,{
		headers: {
			'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
		},
		cache: 'no-store'
	})
	if((res.status !== (constants.HTTP_STATUS_OK || constants.HTTP_STATUS_CREATED) )){
		throw new Error(res.statusText);
	}

	return res.json() as Promise<T>
}

export async function GithubClient(url: string){
	const res = await fetch(url,{
		headers: {
			'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
		},
		cache: 'no-store'
	})
	return res;
}
export async function GithubContents(url: string ): Promise<GithubContentInterface | GithubContentInterface[]>
{
	
	const res = await GithubClient(url);
	if(res.status === constants.HTTP_STATUS_NOT_FOUND){
		throw new NotFoundApiException(res.statusText);
	}

	if(res.status !== 200){
		throw new Error(res.statusText);
	}
	
	return res.json();
}

export async function GithubContentString(url: string): Promise<string>
{
	const res = await GithubClient(url);
	return res.text();
}