export interface SignUpREQ {
    name: string
    username: string
    email: string
    dateOfBirth: string
    gender: string
    password: string
    rePassword: string
}

export interface SignInREQ {
    email: string
    password: string
}

export interface SignUp_InRES {
    success: boolean,
    message: string,
    data: Data
}

interface Data {
    token: string
    tokenType: string
    expiresIn: string
    user: User
}

interface User {
    _id: string
    name: string
    username: string
    email: string
    photo?: string
    cover?: string
}
