export interface IPagination {

    limit: number,
    page: number
}

export interface ISearchPagination extends IPagination {

    search?: string,
}