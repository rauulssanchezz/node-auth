import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, User } from "../../domain";



export class AuthDatasourceImpl implements AuthDatasource {
    
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { name, email, password } = registerUserDto

        try {

            const emailExist = await UserModel.findOne({ email: email })
            if ( emailExist ) throw CustomError.badRequest('User already exists')

            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash( password )
            })

            await user.save()

            return new User(
                user.id,
                user.name,
                user.email,
                user.password,
                user.role
            )

        } catch (error) {

            if( error instanceof CustomError ) {
                throw error
            }
            throw CustomError.internalServer()
        }

    }
}