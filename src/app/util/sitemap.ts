import {API_URL, GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG, ORIGIN} from "@/lib/config/config";
import {MetadataRoute} from "next";

async function getData(){
    // const res = await fetch(API_URL('/obsidian/repos/trees/sitemap'),{
    //     method: 'GET',
    //     next: { revalidate: 3600 }
    // })
    // const result = await res.json();
    // return result;

    const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/git/trees/main?recursive=true`
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
        }
    });
    const jsonData = await res.json();
    const tree = jsonData.tree;
    const result = [];
    
    for(let index=0; index<tree.length; index++){
        const currentData = tree[index];
        if(currentData.path.startsWith('blog') && currentData.path.endsWith('.md')){
            result.push({
                url: `${ORIGIN}/${currentData.path}`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 1,
            })
        }
    }
    return result;
}

export default async function sitemap({id}: {id: number}) : Promise<MetadataRoute.Sitemap>{

    const data = await getData();

    return data;
}