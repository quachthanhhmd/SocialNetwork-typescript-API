import faker from "faker";

export interface IPostFullField {

    id?: number,
    content: string,
    isChange?: Boolean,
    isHidden?: Boolean,
    userId?: number,
    totalEmoji?: number,
}

export const fakePost: IPostFullField = {
    id: faker.datatype.number(100),
    content: faker.datatype.string(30),
    isHidden: false,
    totalEmoji: 0,
    isChange: false,
}