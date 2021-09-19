import {TYPEMESSAGE} from "../constants/message.constant";

export interface IMessageContent {

    type: string,
    content: string,
    link: string
}

export interface IMessageCreate extends IMessageContent {

    sourceId: number,
    targetId: number,
}