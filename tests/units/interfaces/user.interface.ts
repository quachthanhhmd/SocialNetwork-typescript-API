import faker from "faker";

export interface IUserTestAllField {
    id: number,
    username: string,
    password: string,
    isVerified: Boolean,
}

export const fakeUser: IUserTestAllField  = {
    
        id: faker.datatype.number(),
        username: faker.internet.email().toLowerCase(),
        password: "Thanh1234",
        isVerified: true,
    
}