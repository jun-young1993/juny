export interface NextPageCatchAllSegmentProps
{
    params: { slug: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface MultiSegmentPageParams {
    params: {
        slug?: [] | string[]
      }
}