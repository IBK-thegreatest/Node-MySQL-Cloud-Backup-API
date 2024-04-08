export interface dbConfig {
    HOST: string
    USER: string
    PASSWORD: string
    DATABASE: string
    DIALECT: any
    POOL: {
        MAX: number
        MIN: number
        ACQUIRE: number
        IDLE: number
    }
}