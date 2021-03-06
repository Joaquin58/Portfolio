export declare interface auth {
    username: string
    password: string
}

export declare interface createuser {
    firsname: string
    lastname: string
    username: string
    email: string,
    password: string
}

export declare interface IdPayload {
    id: string
    username: string
    iat: number
}