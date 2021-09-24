export interface IPagination {

    limit: number,
    page: number
}

export interface ISearchPagination extends IPagination {

    search?: string,
}


export interface IPaginationResult extends IPagination {

    totalRecord: number,
    totalPage: number,
}