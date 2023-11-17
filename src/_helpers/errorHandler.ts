import { NextFunction, Request, Response } from 'express';

interface ValidationError {
    name: string,
    message: string,
}

const errorHandler = (err: string | ValidationError, _req: Request, res: Response, _next: NextFunction) => {
    if (typeof err === "string") {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === "ValidationError") {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({ message: "Invalid Token" });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

export default errorHandler;
