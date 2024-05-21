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
    let personalAccessToken: undefined | string;
    
    if(gitOAuthCode){
        const accessTokenAuthUrl:string = "https://github.com/login/oauth/access_token";
        const response = await fetch(accessTokenAuthUrl,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_SECRET,
                code: gitOAuthCode,
                redirect: 'follow'
            })
        });
        console.log(response.status);
        const result = await response.json();
        if(result.error){
            personalAccessToken = undefined;
        }
        if(result.access_token){
            personalAccessToken = result.access_token;
        }
        

    }

    return <GuestBook personalAccessToken={personalAccessToken}/>;
}