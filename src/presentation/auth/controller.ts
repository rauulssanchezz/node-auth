import { Request, Response } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain"



export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    registerUser = (req: Request, res: Response): void => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if ( error ) throw res.status(400).json({ error })

        this.authRepository.register(registerUserDto!)
        .then( user => res.json(user) )
        .catch( error => res.status(500).json(error) )
    }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }
}