export interface LoginRequest{
    userName:string;
    password:string
}

export interface RegisterRequest{
    userId:string;
    userName:string;
    emailId:string;
    fullName:string;
    password:string
}

export interface LoggedUser{
    userId:string;
    userName:string;
    role:string
}