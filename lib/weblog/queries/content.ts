export const getRepositoryContent = `
  query GetRepositoryContents($repository: String!, $path: String!) {
    getRepositoryContents(repository: $repository, path: $path) {
      title
      content
    }
  }
`
export const getPostsQuery = `
    query GetPosts($limit: Float, $page: Float, $tagId: String) {
        getPosts(limit: $limit, page: $page, tagId: $tagId) {
            pagination {       # 페이징 정보
                total          # 총 데이터 개수
                page           # 현재 페이지 번호
                limit          # 페이지 크기
                totalPages     # 총 페이지 수
            }
            data {             # 데이터 배열
                id
                title
                content
                tags {
                    id
                    name
                    color
                }
                createdAt
                updatedAt
            }
        }
    }
`

export const getPostQuery = `
    query GetPost($id: String!) {
        getPost(id: $id) {
            id
            title
            content
            tags {
                id
                name
                color
            }
            createdAt
            updatedAt
        }
    }
`

export const getTagsWithPostCountQuery = `
    query {
          getTagsWithPostCount {
            id
            name
            color
            postCount
        }
    }
`

export const getPostTagsQuery = `
    query {
          getPostTags {
            id
            name
            color
        }
    }
`

export const createPostMutation = `
mutation CreatePost($input: CreatePostInputModel!) {
  createPost(input: $input) {
    id
    title
    content
    tags {
      id
      name
      color
    }
  }
}
`

export const loginMutation = `
    mutation Login($input: LoginInputModel!) {
      login(input: $input) {
        accessToken
      }
    }
`

export const meQuery = `
    query {
      me {
        id
        username
        email
        createdAt
      }
    }
`

export const getLatestCommits = `
    query GetCommits($repository: String!, $path: String!) {
        getCommits(repository: $repository, path: $path) {
            sha
            commit {
                committer {
                    name
                    date
                    email
                }
            }
            detail {
                files {
                    sha
                    filename
                    status
                    content
                }
            }
        }
    }
    
`
