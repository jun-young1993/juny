"use client";
import {GithubIssueComment, GithubIssueReplyList} from 'react-github-issue';
import ContainerLayout from "@/components/layouts/container.layouts";
import {useState} from "react";

interface GuestBookProps {
    personalAccessToken?: string
}
const GuestBook = ({personalAccessToken}:GuestBookProps) => {
    const [reload, setReload] = useState("");
    return (
       <ContainerLayout>
           <GithubIssueComment
               gitOAuthClientId={process.env.NEXT_PUBLIC_GIT_HUB_OAUTH_CLIENT_ID}
               gitOwner={process.env.NEXT_PUBLIC_GIT_HUB_OWNER}
                gitIssueNumber={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER}
                gitRepo={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO}
               gitPersonalAccessToken={personalAccessToken}
               onAutoComment={(response: Response)=>{
                response.json()
                .then((result) => {
                        setReload(result.node_id);
                });
               }}
           />
           <GithubIssueReplyList
               reload={reload}
               direction={"asc"}
               gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN}
               gitOwner={process.env.NEXT_PUBLIC_GIT_HUB_OWNER}
               gitIssueNumber={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER}
               gitRepo={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO}
           />
       </ContainerLayout>
    )
}
export default GuestBook;