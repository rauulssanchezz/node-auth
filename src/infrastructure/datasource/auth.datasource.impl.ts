import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, User } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { name, email, password } = registerUserDto

        try {

            const emailExist = await UserModel.findOne({ email: email })
            if ( emailExist ) throw CustomError.badRequest('User already exists')

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