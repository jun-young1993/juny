import { GITHUB_API_URL, GITHUB_CONFIG } from "@/lib/config/config";
import {GithubContentInterface, GithubReadmeContentInterface} from "@/types/github.type";
import { constants } from "http2";
import _ from "lodash";
import { NextResponse } from "next/server";



export async function GET(request: Request)
{

	const url = `${GITHUB_API_URL}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/readme`;
	const res = await fetch(url,{
		headers: {
		    'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
		    'Accept': 'application/vnd.github+json',
		    'X-GitHub-Api-Version': GITHUB_CONFIG.version
		}
	})



	if(res.status !== constants.HTTP_STATUS_OK){
		throw new Error(res.statusText);
	}

	const data: GithubReadmeContentInterface = await res.json();

	if(_.isEmpty(data)){
		throw new Error('not found github readme.md');
	}



	data.content = Buffer.from(data.content, data.encoding).toString('utf8');

	console.log("=>(route.ts:40) data", data);
	return NextResponse.json(data,{
		status: constants.HTTP_STATUS_OK,
	})


}