import {string} from "zod";

export type WeblogFiles = {
    name: string
    path: string
}

export type WeblogFile = {
    filename: string
    status: 'added' | 'modified'
    content: string
}
export type WeblogCommitDetail = {
    files: WeblogFile[]
}
export type WeblogCommit = {
    sha: string
    detail: WeblogCommitDetail
}

export type WebLogCommitOperation = {
    data: { getCommits: WeblogCommit[] }
}

export type Tag = {
    id: string
    name: string
    color: string
}
export type BasePost = {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}
export interface WeblogPost extends BasePost{
    tags: Tag[]
}
export type PaginationInfo = {
    total: number
    page: number
    limit: number
    totalPages: number
}
export type WeblogPosts = {
    data: WeblogPost[],
    pagination: PaginationInfo
}
export type WebLogPostsOperation = {
    data: {
        getPosts: WeblogPosts
    }
    variables: {
        limit?: number
        page?: number
        tagId?: string
    }
}

export type WebLogPostOperation = {
    data: { getPost: WeblogPost }
    variables: {
        id: string
    }
}


export interface TagsWithPostCount extends Tag {
    postCount: number
}
export type TagsWithPostCountOperation = {
    data: { getTagsWithPostCount: [TagsWithPostCount]},
}
export type PostTagsOperation = {
    data: { getPostTags: [Tag]},
}

export type BasePostOperation = {
    data: { createPost: Tag}
    variables: {
        input: {
            tagIds: string[],
            title: string,
            content: string
        }
    }
}
export type Login = {
    accessToken: string
}
export type LoginOperation = {
    data: { login: Login}
    variables: {
        input: {
            email: string,
            password: string
        }
    }
}
export type User = {
    id: string
    username: string
    email: string
    createdAt: Date
}
export type MeOperation = {
    data: { me: User }
}
