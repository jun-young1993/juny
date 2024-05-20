"use client";
import {GithubIssueComment, GithubIssueReplyList} from 'react-github-issue';
import ContainerLayout from "@/components/layouts/container.layouts";

interface GuestBookProps {
    personalAccessToken?: string
}
const GuestBook = ({personalAccessToken}:GuestBookProps) => {

    return (
       <ContainerLayout>
           <GithubIssueComment
               gitOAuthClientId={process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID}
               gitPersonalAccessToken={personalAccessToken}
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