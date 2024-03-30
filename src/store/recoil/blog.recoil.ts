import {atom, selector, useRecoilCallback, useRecoilState} from "recoil";
import {ObsidianContentsByBlog} from "@/lib/client/obsidian.client";
import {BlogContentInterface} from "@/types/blog.type";


export const blogCurrentPathSelector = selector<string>({
    key: "blogCurrentPathSelector",
    get: () => ''
});
export const blogCurrentPathAtom = atom<string>({
    key: "blogCurrentPathAtom",
    default: blogCurrentPathSelector
});

// export function useObsidianContentsByBlog()
// {
//     return useRecoilCallback(
//         ({snapshot, set}) =>
//             (): Promise<BlogContentInterface[] | []> => {
//                 const currentPath = snapshot.getLoadable(blogCurrentPathAtom).getValue();
//                 return ObsidianContentsByBlog(currentPath);
//             },
//         []
//     );
// }

export function useBlog(){
    const [blogCurrentPath, setBlogCurrentPath] = useRecoilState(blogCurrentPathAtom);

    return {blogCurrentPath, setBlogCurrentPath};
}