export interface IBackgroundSummary {

    id: number,
    status: string,
    link: string,
    type: string,
    name: string,
}


export interface IBackgroundCreate {

    userId?: number;
    status: string,
    link?: string,
    type?: string,
    name: string,
    description?: string,
}

export interface  IBackgroundUpdate {

    status: string,
    link?: string,
    type?: string,
    name: string,
    description?: string,
    
}

export interface IBackground extends IBackgroundUpdate {

    id: number,
    
}