import { SplitContainer } from "@/components/juny-react-style";
import LatestBlog from "@/components/main/latest.blog";



async function getData() {
  return [];
}

export default async function Page(){
  const data = await getData()
  
  return <div className='w-full h-full'>                
    <SplitContainer
        flexDirection="column"
    >
        <SplitContainer>
            <LatestBlog />
            <div>right</div>
        </SplitContainer>
    </SplitContainer>
  </div>
}
