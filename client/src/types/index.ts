export interface Authregister {
    name: string,
    email: string,
    password:string,
    avatar?:string,
}

export interface Authlogin {
    email: string,
    password:string,
}