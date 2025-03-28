import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, User } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}
    async login(loginUserDto: LoginUserDto): Promise<User> {
        const { email, password } = loginUserDto

        try {

            const userExist = await UserModel.findOne({ email: email })
            if ( !userExist ) throw CustomError.badRequest('User does not exist')
            if ( !this.comparePassword(password, userExist.password) ) throw CustomError.badRequest('Password does not match')

            return UserMapper.userEntityFromObject(userExist)

        } catch (error) {

            if( error instanceof CustomError ) {
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { name, email, password } = registerUserDto

        try {

            const userExist = await UserModel.findOne({ email: email })
            if ( userExist ) throw CustomError.badRequest('User already exists')

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword( password )
            })

            await user.save()

            return UserMapper.userEntityFromObject(user)

        } catch (error) {

            if( error instanceof CustomError ) {
                throw error
            }
            throw CustomError.internalServer()
        }

    }
}