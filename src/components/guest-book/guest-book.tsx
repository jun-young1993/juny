"use client";
import {GithubIssueComment, GithubIssueReplyList} from 'react-github-issue';
import ContainerLayout from "@/components/layouts/container.layouts";
const GuestBook = () => {

    return (
       <ContainerLayout>
                <GithubIssueReplyList
                    gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN}
                    gitOwner={process.env.NEXT_PUBLIC_GIT_HUB_OWNER}
                    gitIssueNumber={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_NUMBER}
                    gitRepo={process.env.NEXT_PUBLIC_GIT_HUB_ISSUE_REPO}
                />
                <GithubIssueComment
                    gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN}
                />
       </ContainerLayout>
    )
}
export default GuestBook;