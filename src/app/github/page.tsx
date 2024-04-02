import GithubContent from "@/components/contents/github.content";
import ContainerLayout from "@/components/layouts/container.layouts";
import { API_URL } from "@/lib/config/config";
import { GithubReadmeContent } from "@/types/github.type";
import { MenuType } from "@/types/menu.type";

async function getData(): Promise<GithubReadmeContent>{
	const res = await fetch(API_URL('/github'),{
		method: 'GET',
	})

	const result = await res.json();
	return result;
}

export default async function Page(){
	const data = await getData();
  return (
      <ContainerLayout
        children={
		<GithubContent content={data.content} />
        }
        type={MenuType.GITHUB}
        title={MenuType.GITHUB}
      />
  )
}
