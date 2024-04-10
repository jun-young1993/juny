import { GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG } from "../config/config";
import { BlogContentInterface } from "@/types/blog.type";
import {constants} from "http2";
import {NotFoundApiException} from "@/exceptions/not-found-api.exception";
import {instanceOf} from "prop-types";

async function ObsidianContents(path?: string ): Promise<BlogContentInterface[] | []>
{
	const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/contents/${path ? path : ''}`;
	const res = await fetch(url,{
		headers: {
			'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
			'Accept': 'application/vnd.github.html+json',
			'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
		}
	})

	if(res.status === constants.HTTP_STATUS_NOT_FOUND){
		throw new NotFoundApiException(res.statusText);
	}

	if(res.status !== 200){
		throw new Error(res.statusText);
	}


	return res.json();
}

export async function ObsidianContentsByBlog(path?: string)
{
	const data = await ObsidianContents(`blog/${path ? path : ''}`);

	return data;
}

export async function ObsidianContentsByCalendar(path?: string)
{
	try{
		const data = await ObsidianContents(`calendar/${path ? path : ''}`);
		return data;
	}catch(e){
		if(e instanceof NotFoundApiException){
			return [];
		}
		throw e;
	}




}
