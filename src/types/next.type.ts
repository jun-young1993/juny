export interface NextPageCatchAllSegmentProps
{
    params: { slug: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface MultiSegmentPageParams {

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

