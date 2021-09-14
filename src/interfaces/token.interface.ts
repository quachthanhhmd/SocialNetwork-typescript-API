

export interface ITokenAttributes {
    token: string,
    userId: number,
    type: string,
    expires: moment.Moment
}

//payload to compress and incompress Token
export interface IPayload {
    sub: number,
    iat: number,
    exp: number,
    type: string
}