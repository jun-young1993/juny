import { GithubBlogShowPathSrc } from "@/utills/config/config.type";
import GithubBlogConfig from "@/utills/config/github-blog.config";
const userConfig = GithubBlogConfig({
    title: 'juny.blog',
    description: 'juny.blog',
    domain: 'https://juny.blog',
    webSiteImage: 'https://avatars.githubusercontent.com/u/102360897?v=4',
    git: {
        repository: 'Obsidian',
        owner: 'jun-young1993'
    },
    headerMenus: [{
        type: 'markdown-viewer',
        path: '/',
        title: 'About Me'
    }],
    mainPage: {
        type: 'markdown-viewer',
        path: 'blog/docs/nextjs-github-blog/readme.md',
    },
    githubBlogShowPaths:[{
        type: 'profile',
        src: GithubBlogShowPathSrc.GIT_AVATAR,
        path: 'jun-young1993' // git repository name
    },{
        type: 'contents',
        path: 'blog'
    },{
        type: 'repository-contents',
        path: 'react-style/docs'
    }],
    userSitemap: [
        'ads.txt'
    ],
    ignorePaths: [
        /^gemiso(\/.*)?$/,     // 'Private' 또는 'Private/*'
        /^Private(\/.*)?$/,     // 'Private' 또는 'Private/*'
    ],
    nextConfig: {
        cache: {
            revalidate : 3600
        }
    },
    wikiLink: 'images',
    tableOfContents: true,
    tableOfContentsMaxLevel: '3'
});
export default userConfig;