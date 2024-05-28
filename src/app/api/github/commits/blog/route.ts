import { BlogPath } from "@/defined/blog.defined";
import { GithubObsidianClient } from "@/lib/client/github.client";
import { GITHUB_API_URL, GITHUB_CONFIG, GITHUB_OBSIDIAN_CONFIG } from "@/lib/config/config";
import { MenuType } from "@/types/menu.type";
import { constants } from "http2";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

interface GithubCommitInteface {
	sha: string
}
interface GithubCommitFile {
	sha: string
	filename: string
}
interface GithubCommitDetailInterface {
	files: GithubCommitFile[] | []
}
interface LatestBlogResposneInterface {
	filename: string
}

export async function GET(request: Request)
{

	const { searchParams } = new URL(request.url);
	
	const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/commits?path=${MenuType.BLOG}`;
	const data = await GithubObsidianClient<GithubCommitInteface[]>(url);

	const limit = searchParams.get('limit') ?? 5;
	const filePathes = new Set<LatestBlogResposneInterface>();
	for(let index=0; index<data.length; index++){
		const currentData = data[index];
		const sha = currentData.sha;
		const detailUrl = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/commits/${sha}`;
		const detailDatas = await GithubObsidianClient<GithubCommitDetailInterface>(detailUrl);
		
		
		for(let fileIndex=0; fileIndex<detailDatas.files.length; fileIndex++){
			const currentFile = detailDatas.files[fileIndex];
		
			if(currentFile.filename.startsWith(MenuType.BLOG)){
				const latestBlogData: LatestBlogResposneInterface = {
					filename: currentFile.filename
				};
				filePathes.add(latestBlogData);
				
				if(filePathes.size > Number(limit)){
					break;
				}
			}
		}
		if(filePathes.size > Number(limit)){
			break;
		}
	}

	

	return NextResponse.json(Array.from(filePathes.values()),{
		status: constants.HTTP_STATUS_OK
	})
}