import {MultiSegmentPageParams, YearMonthDaySlugInterface} from "@/types/next.type";
import {CalendarInterface} from "@/types/calendar.type";

import {MenuType} from "@/types/menu.type";
import ContainerLayout from "@/components/layouts/container.layouts";
import {CalendarLayout} from "@/components/layouts/calendar.layout";
import {getCalendarData} from "@/lib/client/calendar.client";

export interface YearMonthDayFilenameSlugInterface extends YearMonthDaySlugInterface{
    filename: string
}
export interface MultiSegmentPageCalendarYearMonthDayFilenameParams extends MultiSegmentPageParams{
    params: YearMonthDayFilenameSlugInterface
}

// export async function getData(path: string): Promise<CalendarInterface[]>{

//     const data= await getCalendarData(
//         path
//     );
//     if(data.length === 0){
//         throw new Error('not found data');
//     }
//     console.log('data',data);
//     return data;
// }

export default async function Page({params}: MultiSegmentPageCalendarYearMonthDayFilenameParams) {
    // const { year, month, day, filename } = params;
    // const data:CalendarInterface[] = await getData(`${year}/${month}/${day}`);
    // const content:CalendarInterface[] = await getData(`${year}/${month}/${day}/${filename}`);
    


    return (
        <div>hi</div>
        // <ContainerLayout
        //     type={MenuType.CALENDAR}
        //     title={MenuType.CALENDAR}
        // >
        //     <CalendarLayout
        //         data={data}
        //         content={content[0].content ?? ''}
        //     />
        // </ContainerLayout>
    )
}