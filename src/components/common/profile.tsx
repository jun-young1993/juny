'use client';
import { GithubProfile, LeftRightContainer, AlignBox } from "juny-react-style";

export default function Profile()  {

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
                <div>hi</div>
            </AlignBox>
        </LeftRightContainer>
    )
}