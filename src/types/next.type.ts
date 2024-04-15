

export interface NextPageCatchAllSegmentProps
{
    params: { slug: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface MultiSegmentPageParams {

}

export interface MultiSegmentApiParams {
    
}
export interface YearMonthInterface {
	
	year: string
	month: string

}
export interface YearMonthDaySlugInterface extends YearMonthInterface{
	day: string
}
export interface MutiSegmentSlugPageParams extends MultiSegmentPageParams{
    params: {
        slug: string[] | []
    }
}

export interface MultiSegmentApiParams {
    params: {
        slug?: [] | string[] | undefined
    }
}

