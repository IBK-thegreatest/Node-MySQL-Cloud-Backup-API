export interface Register {
    userId: string
    username: string
    email: string
    password: string
    isAdmin?: boolean
}

export interface Login {
    email: string
    password: string
}

export interface User extends Register {
    token: string
}