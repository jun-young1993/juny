import ContainerLayout from "@/components/layouts/container.layouts";
import { API_URL } from "@/lib/config/config";
import { GithubReadmeContentInterface } from "@/types/github.type";
import { MenuType } from "@/types/menu.type";
import MarkDownPreview from "@/components/markdown/mark-down";

async function getData(): Promise<GithubReadmeContentInterface>{
	const res = await fetch(API_URL('/github/readme'),{
		method: 'GET',
	})

	const result = await res.json();

	
	result.content = Buffer.from(result.content,result.encoding).toString('utf-8');
	return result;
}

export default async function Page(){
	const data = await getData();

  return (
      <ContainerLayout
        type={MenuType.GITHUB}
        title={MenuType.GITHUB}
      >
	<MarkDownPreview source={data.content} />
      </ContainerLayout>
  )
}
