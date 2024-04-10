import {getPreviousMonthLastSunday, getDaysInMonth, DayOfWeek} from "juny-tsutil";
import HeaderCalendar from "@/components/calendar/header.calendar";
import {CalendarInterface} from "@/types/calendar.type";
import moment from "moment";

interface CalendarProps {
	year: number
	month: number
	// data: {[key:string]: CalendarInterface[]}
}

interface DayProps {
	date: Date
	disable: boolean
}
function Day({date, disable}: DayProps){
	return <div className={`
	text-center w-10 justify-self-center
	${disable
	? 'text-gray-300 dark:text-gray-600'
	: ''}
	`}>{date.getDate()}</div>
}
export default function Calendar({
	year, month, data
								 }: CalendarProps){
	const previousMonthLastSunday = getPreviousMonthLastSunday(year, month);
	const daysInMonth = getDaysInMonth(year, month);




	return (
		<div className={"w-full h-full"}>
			<HeaderCalendar year={year} month={month} />

			<div className="grid grid-cols-7 gap-4">
				{Object.keys(DayOfWeek).filter(key => isNaN(Number(key))).map((dayOfWeek) => {
					return <div key={dayOfWeek} className={"text-center"}>{dayOfWeek}</div>
				})}

				{previousMonthLastSunday.map((day) => {
					return <Day key={day.toString()} date={day} disable={true} />
				})}
				{daysInMonth.map((day) => {

					const count = data[day.getDate().toString()] ? data[day.getDate().toString()].length : 0;




					return (<div className="indicator justify-self-center" key={day.toString()}>
						{count === 0
							? null
							: <span className="indicator-item badge badge-secondary dark:badge-primary">{count}</span>
						}
						<Day key={day.toString()} date={day} />
					</div>)

				})}
			</div>
		</div>

	)
}