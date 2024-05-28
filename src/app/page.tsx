import { SplitContainer } from "@/components/juny-react-style";
import LatestBlog from "@/components/main/latest.blog";
import { API_URL } from "@/lib/config/config";

export interface LatestBlogInterface {
  filename: string
}

async function getData<LatestBlog>():Promise<{latest_blog: LatestBlog}> {
  const latestBlogData = await fetch(API_URL('/github/commits/blog'),{
    method: 'GET',
    cache: 'no-store'
  });
  const latesetBlogDataJson = await latestBlogData.json() as LatestBlog;
  return {
    latest_blog: latesetBlogDataJson
  }
}

export default async function Page(){
  const data = await getData<
  LatestBlogInterface[]
  >()

  return <div className='w-full h-full'>                
    <SplitContainer
        flexDirection="column"
    >
        <SplitContainer>
            <LatestBlog 
              latestBlog={data.latest_blog}
            />
            <div></div>
        </SplitContainer>
    </SplitContainer>
  </div>
}
