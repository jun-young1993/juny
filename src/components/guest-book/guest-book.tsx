"use client";
import {GithubIssueComment, GithubIssueReplyList} from 'react-github-issue';
import ContainerLayout from "@/components/layouts/container.layouts";
import {useSearchParams} from "next/navigation";
const GuestBook = () => {
    const searchParams = useSearchParams();
    const gitOAuthCode = searchParams.get('code');
    if(gitOAuthCode){
        const accessTokenAuthUrl:string = "https://github.com/login/oauth/access_token";
        console.log({
            client_id: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_SECRET,
            code: gitOAuthCode,
        });
        fetch(accessTokenAuthUrl,{
            method: "post",
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_SECRET,
                code: gitOAuthCode,
            })
        })
            .then((result) => {
                console.log(result.json());
            })

    }
    return (
       <ContainerLayout>
           <GithubIssueComment
               // gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN}

           />
            <GithubIssueReplyList
                gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN}
                gitOwner={process.env.NEXT_PUBLIC_GIT_HUB_OWNER}
                gitIssueNumber={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER}
                gitRepo={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO}
            />
       </ContainerLayout>
    )
}
export default GuestBook;