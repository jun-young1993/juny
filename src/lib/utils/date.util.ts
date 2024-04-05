import moment from "moment";
export function getDaysInMonth(month: number) : string[]
{
	// month는 1부터 12까지의 숫자여야 합니다.
	const startDate = moment(`${month}-01`, 'MM-DD');
	const endDate = startDate.clone().endOf('month');
	
	const days = [];
	let currentDate = startDate.clone();
	
	while (currentDate.isSameOrBefore(endDate, 'day')) {
	  days.push(currentDate.format('YYYY-MM-DD'));
	  currentDate.add(1, 'day');
	}
	
	return days;
}