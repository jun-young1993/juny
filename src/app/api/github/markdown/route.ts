import { NextResponse} from "next/server";
import APP_CONFIG from "@/utills/config/config";
import {constants} from "http2";
import getUserConfig from "@/utills/config/get-user.config";

export async function POST(req: Request): Promise<Response>
{
    const {GIT_HUB_API_REQUEST_HEADER, GIT_HUB_API_END_POINT} = APP_CONFIG;
    const {path} = await req.json();

    const DOMAIN = getUserConfig('domain')
    const getContentUrl = `${DOMAIN}/api/github/contents/${path}`;
    if(!path.endsWith('.md')){
        throw new Error('This is not a Markdown page.')
    }
    const contentResponse = await fetch(getContentUrl);
    const result = await contentResponse.json();
    const text = Buffer.from(result.content, result.encoding).toString('utf8');

    const response = await fetch(GIT_HUB_API_END_POINT.markdown(),{
        method: "POST",
        headers: GIT_HUB_API_REQUEST_HEADER,
        body: JSON.stringify({text: text})
    });
    const {status, statusText } = response;
    if(status !== constants.HTTP_STATUS_OK){
        throw new Error(`Request failed with status ${status}: ${statusText}`);
    }
    const markdownContent = await response.text();
    return NextResponse.json({
        content: markdownContent
    });
}