import { AuthDatasource, CustomError, RegisterUserDto, User } from "../../domain";



export class AuthDatasourceImpl implements AuthDatasource {
    
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        
        const { name, email, password } = registerUserDto

        try {

            return new User(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE']
            )

        } catch (error) {

            if( error instanceof CustomError ) {
                throw error
            }
            throw CustomError.internalServer()
        }

    }
}