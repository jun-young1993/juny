import Calendar from "@/components/calendar/calendar";
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
			<Calendar />
			{/* {getDaysInMonth(2023,4).map((day) => {
				return <div>${day.toString()}</div>
			})} */}
		</ContainerLayout>
	)
}