'use client';
import {LeftArrow, RightArrow} from "@/icons/svg";
import moment from "moment";
import {useRouter} from "next/navigation";
import {MenuType} from "@/types/menu.type";
import {useEffect, useRef, useState} from "react";
import {DATE_UNIT} from "@/defined/date.defined";
import { fillWord } from "juny-tsutil";

interface HeaderCalendarProps {
    year: number
    month: number
}


export default function HeaderCalendar({
    year, month
}: HeaderCalendarProps){
    const router = useRouter();

    const [clicked, setClicked] = useState<null | DATE_UNIT>(null)
    const [yearState, setYearState] = useState<number>(year);
    const [monthState, setMonthState] = useState<number>(month);
    const yearRef = useRef<HTMLDivElement>(null!);

    const yearMonthFormat = 'YYYY/MM';

    const momentDate = moment({
        year : year,
        month: month - 1
    });
    const previousMomentDate = momentDate.clone().subtract(1,'month');
    const previousYearMonthFormat = previousMomentDate.format(yearMonthFormat);


    const nextMomentDate = momentDate.clone().add(1,'month');
    const nextYearMonthFormat = nextMomentDate.format(yearMonthFormat);

    const handleRedirect = (yearMonthFormat: string) => {
        router.push(`/${MenuType.CALENDAR}/${yearMonthFormat}`)
    }

    useEffect(() => {
        yearRef?.current?.focus();
    },[])

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const keyPressed = e.key;

        // 입력된 값이 숫자이거나 삭제(backspace) 키인 경우에만 작업을 수행
        if (/^\d$/.test(keyPressed)) {

        }
        console.log("=>(header.calendar.tsx:49) keyPressed", keyPressed);
        if(keyPressed === 'Backspace'){
            setYearState(parseInt(yearState.toString().slice(1,-1)));
        }
    }
    return (
        <div className={"flex justify-center gap-10 px-5 pb-3"}>

            <button className="btn btn-circle btn-xs" onClick={() => {
                handleRedirect(previousYearMonthFormat);
            }}>
                <LeftArrow />
            </button>
                <div className={"flex justify-center"}>
                    <div
                         ref={yearRef}
                         className={`hover:border hover:border-indigo-300`}
                         autoFocus={true}
                         onFocus={() => {
                             console.log("=>(header.calendar.tsx:65) focus");
                         }}
                         onClick={(event) => {
                             yearRef?.current?.focus();
                             console.log("=>(header.calendar.tsx:68) click");

                             // setClicked(DATE_UNIT.YEAR)
                         }}
                         onKeyUp={(e) => handleKeyUp(e)}
                    >
                        {yearState}
                    </div>
                     -
                    <div className={"hover:border hover:border-indigo-300"} onClick={() => setClicked(DATE_UNIT.MONTH)}>
                        {fillWord(monthState.toString(),2,"0")}
                    </div>
                </div>
            <button className="btn btn-circle btn-xs" onClick={() => {
                handleRedirect(nextYearMonthFormat);
            }}>
                <RightArrow />
            </button>



        </div>
    )
}