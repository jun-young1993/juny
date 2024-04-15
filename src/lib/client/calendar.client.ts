import {CalendarInterface} from "@/types/calendar.type";
import {API_URL} from "@/lib/config/config";
import {CalendarPath} from "@/defined/calendar.defined";

export async function getCalendarData<T>(path?: string): Promise<T> {
    const dynamicPath = path ? path : '';

    const res = await fetch(API_URL(`${CalendarPath}/${dynamicPath}`),{
        method: 'GET',
        next: { tags: dynamicPath.split('/') }
    });

    const result = await res.json();

    return result;
}