export interface NextPageCatchAllSegmentProps
{
    params: { slug: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface MultiSegmentPageParams {
    params: {
        slug?: [] | string[] | undefined
    }
}

export interface MultiSegmentApiParams {
    params: {
        slug?: [] | string[] | undefined
    }
}

