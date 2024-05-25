"use client";
import {GithubIssueComment, GithubIssueReplyList, useGithubIssue} from 'react-github-issue';
import ContainerLayout from "@/components/layouts/container.layouts";

interface GuestBookProps {
    gitUserPersonalAccessToken?: string
}
const GuestBook = ({gitUserPersonalAccessToken}:GuestBookProps) => {
    
    if(
        !(
            process.env.NEXT_PUBLIC_GIT_HUB_TOKEN
            && process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER
            && process.env.NEXT_PUBLIC_GIT_HUB_OWNER
            && process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO
        )
    ){
        throw new Error('A required value is missing');
    }

    const {data, comment, isCommentLoading, locationLogin, isLogin} = useGithubIssue({
        gitPersonalAccessToken: process.env.NEXT_PUBLIC_GIT_HUB_TOKEN,
        gitIssueNumber: process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER,
        gitOwner: process.env.NEXT_PUBLIC_GIT_HUB_OWNER,
        gitRepo: process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO,
        gitUserPersonalAccessToken: gitUserPersonalAccessToken
    });

    return (
       <ContainerLayout>
           <GithubIssueComment
               gitPersonalAccessToken={gitUserPersonalAccessToken}
               isLogin={isLogin}
               isLoading={isCommentLoading}
               onSubmit={(message) => {
                comment(message);            
               }}
               onLogin={() => {
                if(process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID){
                    locationLogin(process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID)
                }
               }}
           />
           <GithubIssueReplyList
               data={data}
           />
       </ContainerLayout>
    )
}
export default GuestBook;