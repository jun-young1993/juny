import {_BLOG_CONTENT_TYPE} from "@/defined/blog.defined";
import { GithubContentInterface } from "./github.type";

export interface CalendarInterface extends GithubContentInterface{
    name: string
    path: string
    type: _BLOG_CONTENT_TYPE

}

export type DayByCalendarType = {
    [key: string] : CalendarInterface[]
}
