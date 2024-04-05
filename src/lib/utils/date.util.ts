import moment from "moment";

/**
 * 특정 월의 시작일부터 종료일까지의 날짜 배열을 반환합니다.
 * 
 * @typedef {Object} Moment
 * @see {@link https://momentjs.com/ Moment.js}
 * 
 * @param {number} year - 년도를 나타내는 숫자
 * @param {number} month - 월을 나타내는 숫자 (1부터 12까지의 숫자)
 * 
 * @returns {string[]} 해당 월의 날짜 배열 예: ['YYYY-MM-DD', 'YYYY-MM-DD', ...]
 */
export function getDaysInMonth(year:number, month: number) : string[]
{
	/** @type {Moment} */
	const startDate = moment(`${month}-01`, 'YYYY-MM-DD');

	/** @type {Moment} */
	const endDate = startDate.clone().endOf('month');
	
	const days = [];
	let currentDate = startDate.clone();
	
	while (currentDate.isSameOrBefore(endDate, 'day')) {
	  days.push(currentDate.format('YYYY-MM-DD'));
	  currentDate.add(1, 'day');
	}
	
	return days;
}

export function getPrevMonth(){

}