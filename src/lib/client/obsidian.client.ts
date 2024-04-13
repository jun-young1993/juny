import { GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG } from "../config/config";
import { BlogContentInterface } from "@/types/blog.type";
import {constants} from "http2";
import {NotFoundApiException} from "@/exceptions/not-found-api.exception";
import {instanceOf} from "prop-types";
import { GithubContentInterface } from "@/types/github.type";
import { BlogPath, _BLOG_CONTENT_TYPE } from "@/defined/blog.defined";
import { CalendarPath } from "@/defined/calendar.defined";
import { GithubContentString, GithubContents } from "./github.client";
import _ from "lodash";

async function ObsidianContents(path?: string ): Promise<GithubContentInterface[]>
{
	try{
		const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/contents/${path ? path : ''}`;
		const result = await GithubContents(url);
		if(!_.isArray(result)){
			return [result];
		}

		return result;
	}catch( error ){
		throw error;
	}

}

export async function ObsidianContentsByBlog(path?: string)
{
	const data = await ObsidianContents(`${BlogPath}/${path ? path : ''}`);

	return data;
}

export async function ObsidianContentsByCalendar(path?: string)
{
	try{
		const data = await ObsidianContents(`${CalendarPath}/${path ? path : ''}`);
		return data;
	}catch(e){
		if(e instanceof NotFoundApiException){
			return [];
		}
		throw e;
	}
}

export async function ObsidianFileContentEncoding(content: GithubContentInterface){

}

export async function ObsidianFileContentsEncoding(contents: GithubContentInterface[]): Promise<GithubContentInterface[]>
{
	const result : GithubContentInterface[] = [];
	// contents.forEach(async (content) => {
	for(const content of contents){
		if(content.type === _BLOG_CONTENT_TYPE.FILE){
			const fileContent = await GithubContentString(content.download_url);
			if(!_.isEmpty(fileContent)){
				content.content = fileContent;
			}
			
		
		}
		result.push(content);
		
	}

	// })

	return result;
}
