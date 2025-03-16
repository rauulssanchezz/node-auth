import { NextFunction, Request, Response } from "express";



export class AuthMiddleware {

    static validateJWT = (req: Request, res: Response, next: NextFunction) => {
        console.log('Pasó por el middleware')

        next()
    }

}