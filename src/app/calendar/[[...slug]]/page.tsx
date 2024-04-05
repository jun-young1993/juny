import ContainerLayout from "@/components/layouts/container.layouts"
import { getDaysInMonth } from "@/lib/utils/date.util";
import { MenuType } from "@/types/menu.type"
import { MultiSegmentPageParams } from "@/types/next.type"


export default async function Page({ params }: MultiSegmentPageParams){
	
	return (
		<ContainerLayout 
			type={MenuType.CALENDAR}
			title={MenuType.CALENDAR}
		>
			{getDaysInMonth(2023,2).map((day) => {
				return <div>${day}</div>
			})}
		</ContainerLayout>
	)
}