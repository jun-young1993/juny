import MainContainer from "@/components/main/main.container";

async function getData() {
  return [];
}

export default async function Page(){
  const data = await getData()
  
  return <div className='w-full h-full'>                
    <MainContainer />
  </div>
}
