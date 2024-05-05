'use client';
import { GithubProfile, LeftRightContainer, AlignBox } from "juny-react-style";
import MarkDownPreview from "@/components/markdown/mark-down";
import {BlogContentInterface} from "@/types/blog.type";
interface ProfileProps {
    data: BlogContentInterface[0]
}
export default function Profile(props: ProfileProps)  {

    return(
        <LeftRightContainer
            ratio={0.2}
        >
            <AlignBox>
                <GithubProfile
                    size={"100px"}
                    gitPersonalAccessToken={process.env.NEXT_PUBLIC_GIT_HUB_TOKEN as string}
                />
            </AlignBox>
            <AlignBox>
                <MarkDownPreview source={props.data[0].content} />
            </AlignBox>
        </LeftRightContainer>
    )
}