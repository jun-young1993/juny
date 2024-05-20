import GuestBook from "@/components/guest-book/guest-book";
import {useSearchParams} from "next/navigation";
interface Params {
    searchParams: {
        code?: string
    }
}
export default async function Page({
    searchParams
}: Params){
    const gitOAuthCode = searchParams.code;
    let personalAccessToken;
    if(gitOAuthCode){
        const accessTokenAuthUrl:string = "https://github.com/login/oauth/access_token";
        const response = await fetch(accessTokenAuthUrl,{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_SECRET,
                code: gitOAuthCode,
                redirect: 'follow'
            })
        });
        const result = await response.text();
        const data = result.split("&");
        const accessToken = data[0].split("=")[1];
        personalAccessToken = accessToken;
    }

    return <GuestBook personalAccessToken={personalAccessToken}/>;
}