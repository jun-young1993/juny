import ContainerLayout from "@/components/layouts/container.layouts"
import { MenuType } from "@/types/menu.type"
import { MultiSegmentPageParams } from "@/types/next.type"
import { getDaysInMonth } from "juny-tsutil";

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