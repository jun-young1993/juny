import ContainerLayout from "@/components/layouts/container.layouts";
import { MenuType } from "@/types/menu.type";

export default async function Page(){
  return (
      <ContainerLayout
        children={
         <div>github</div>
        }
        type={MenuType.GITHUB}
        title={MenuType.GITHUB}
      />
  )
}
