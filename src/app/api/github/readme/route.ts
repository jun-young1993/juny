import { GITHUB_API_URL, GITHUB_CONFIG } from "@/lib/config/config";
import { GithubContentInterface } from "@/types/github.type";
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

	const data: GithubContentInterface = await res.json();

	if(_.isEmpty(data)){
		throw new Error('not found github readme.md');
	}

	const contentRes = await fetch(data.html_url,{
		headers: {
			'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': GITHUB_CONFIG.version
		}
	});
	const content = await contentRes.text();
	const markdownRes = await fetch(`${GITHUB_API_URL}/markdown`,{
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': GITHUB_CONFIG.version
		},
		body: JSON.stringify({
			text: Buffer.from(content,'base64').toString('utf8')
		})
	});
	const result = {
		content: await markdownRes.text()
	}
	return NextResponse.json(result,{
		status: constants.HTTP_STATUS_OK,
	})


}