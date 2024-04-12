import { MenuType } from "@/types/menu.type";
import { fillWord } from "juny-tsutil";
import { redirect } from "next/navigation";

export default async function Page(){
	redirect(`/${MenuType.CALENDAR}/${new Date().getFullYear()}/${fillWord((new Date().getMonth()+1).toString(), 2, '0')}`);

	return <></>
	
}