import { STATUS_CODES } from "http";
import { GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG } from "../config/config";
import { BlogContentInterface } from "@/types/blog.type";

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
	
	if(res.status !== 200){
		throw new Error(res.statusText);
	}

	return res.json();
}

export async function ObsidianContentsByBlog(path?: string)
{
	return await ObsidianContents(`blog/${path ? path : ''}`);
}
// pages/shop/[...slug].js