import { AuthDatasource, AuthRepository, RegisterUserDto, User } from "../../domain";



export class AuthRepositoryImpl implements AuthRepository {
    
    constructor(
        private readonly authDatasource: AuthDatasource,
    ) {}
    
    register(registerUserDto: RegisterUserDto): Promise<User> {
        return this.authDatasource.register(registerUserDto)
    }

}