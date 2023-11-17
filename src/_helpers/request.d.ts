declare namespace Express {
    export interface Request {
        auth: {
            sub: string,
            exp: number,
        };
    }
}