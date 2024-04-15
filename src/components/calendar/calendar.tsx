import {getPreviousMonthLastSunday, getDaysInMonth, DayOfWeek, fillWord} from "juny-tsutil";
import HeaderCalendar from "@/components/calendar/header.calendar";
import {CalendarInterface, DayByCalendarInterface} from "@/types/calendar.type";
import { CalendarPath } from "@/defined/calendar.defined";
import Link from "next/link";


interface CalendarProps {
	year: number
	month: number
	data: DayByCalendarInterface
}

interface BaseDay {
	date: Date
	disable?: boolean
}
interface DayProps extends BaseDay{
	link?: string
}

function BaseDay({date, disable}: DayProps){
	return <div className={`
		text-center w-10 justify-self-center
		${disable
		? 'text-gray-300 dark:text-gray-600'
		: ''}
	`}>{date.getDate()}</div>
}

function Day({date, disable, link}: DayProps){
	return link ? <Link href={link}><BaseDay date={date} disable={disable} /></Link>: <BaseDay date={date} disable={disable} />
}
export default function Calendar({
	year, month, data
								 }: CalendarProps){
	const previousMonthLastSunday = getPreviousMonthLastSunday(year, month);
	const daysInMonth = getDaysInMonth(year, month);

		// const handleDayClick = (data: CalendarInterface[]) => {
		// 	console.log(data);
		// }
									console.log(data);

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

					return (<div 
							className={`indicator justify-self-center ${count === 0 ? '': 'hover:cursor-pointer hover:bg-slate-100 transition duration-300 hover:-translate-y-3 hover:scale-110'}`} key={day.toString()}
						>
						{count === 0
							? null
							: (
							<span className="indicator-item badge badge-secondary dark:badge-primary">{count}</span>
						)
						}
						<Day key={day.toString()} date={day} link={count === 0 ? undefined : `${CalendarPath}/${year}/${fillWord(month.toString(),2,"0")}/${day.getDate().toString()}`}/>

					</div>)

				})}
			</div>
			
		</div>

	)
}