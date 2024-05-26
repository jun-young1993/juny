'use client'

import {List, ListItem, SplitContainer} from "juny-react-style";

export default function MainContainer()  {
    return <SplitContainer>
        <List
            title={"test title"}
        >
            <ListItem>hi</ListItem>
        </List>
        <div>right</div>
    </SplitContainer>;
}