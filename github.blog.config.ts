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
        path: 'blog/docs'
    }],
    userSitemap: [
        'ads.txt'
    ],
    ignorePaths: [
        /^Gemiso(\/.*)?$/,     // 'Private' 또는 'Private/*'
        /^(\/.*)Private(\/.*)?$/,     // 'Private' 또는 'Private/*'
    ]
});
export default userConfig;