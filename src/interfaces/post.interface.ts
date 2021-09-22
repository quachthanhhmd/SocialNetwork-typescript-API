export interface ICreatePost {

    content: string,
    isHidden: Boolean,
    file?: Array<string>,
}


export interface IUpdatePost {

    content?: string,
    isHidden?: Boolean,
    file?: Array<string>,
    isChange?: Boolean,
}

export interface IUpdateEmoij {

    
}