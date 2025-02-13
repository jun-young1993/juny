import {
    createPostMutation,
    getPostQuery,
    getPostsQuery, getPostTagsQuery,
    getTagsWithPostCountQuery, loginMutation, meQuery
} from "./queries/content"
import { isWeblogError } from "./type-guards"
import {
    BasePostOperation, LoginOperation, MeOperation,
    PostTagsOperation,
    TagsWithPostCountOperation,
    WeblogPost,
    WebLogPostOperation,
    WeblogPosts,
    WebLogPostsOperation
} from "./types"


type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never

export const endpoint = `${process.env.API_URL}/graphql/post`



export async function weblogFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache
  headers?: RequestInit['headers']
  query: string
  tags?: string[]
  variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> {
  try {

    const result = await fetch(endpoint,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify({
          query,
          variables: variables ?? {}
        }),
        cache,
        ...(tags && { next: { tags } }),
        credentials: "include"
    })
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    if(isWeblogError(error)){
        throw {
            cause: error.cause?.toString() || 'unknown',
            status: error.status || 500,
            message: error.message,
            query
          };
    }
    throw error
  }
}


export async function getPosts(variables: WebLogPostsOperation['variables']): Promise<WeblogPosts> {
    const response = await weblogFetch<WebLogPostsOperation>({
        query: getPostsQuery,
        cache: 'no-store',
        variables: variables
    })
    return response.body.data.getPosts
}

export async function getPost(variables: WebLogPostOperation['variables']): Promise<WeblogPost> {
    const response = await weblogFetch<WebLogPostOperation>({
        query: getPostQuery,
        cache: 'no-store',
        variables: variables
    })
    return response.body.data.getPost
}

export async function getTagsWithPostCount(): Promise<TagsWithPostCountOperation['data']['getTagsWithPostCount']> {
    const response = await weblogFetch<TagsWithPostCountOperation>({
        query: getTagsWithPostCountQuery,
        cache: 'no-store',
    })

    return response.body.data.getTagsWithPostCount
}

export async function getPostTags(): Promise<PostTagsOperation['data']['getPostTags']> {
    const response = await weblogFetch<PostTagsOperation>({
        query: getPostTagsQuery,
        cache: 'no-store',
    })

    return response.body.data.getPostTags
}

export async function createPost(variables: BasePostOperation['variables']): Promise<BasePostOperation['data']['createPost']> {
    const response = await weblogFetch<BasePostOperation>({
        query: createPostMutation,
        cache: 'no-store',
        variables:variables
    })

    return response.body.data.createPost
}

export async function login(variables: LoginOperation['variables']): Promise<LoginOperation['data']['login']> {
    const response = await weblogFetch<LoginOperation>({
        query: loginMutation,
        cache: 'no-store',
        variables:variables
    });
    return response.body.data.login
}

export async function getMe(token: string): Promise<MeOperation['data']['me'] | null> {
    try{
        const response = await weblogFetch<MeOperation>({
            query: meQuery,
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        return response.body.data.me
    }catch(e){
        return null
    }

}

