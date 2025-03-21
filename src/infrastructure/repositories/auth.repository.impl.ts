import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, User } from "../../domain";



export class AuthRepositoryImpl implements AuthRepository {
    
    constructor(
        private readonly authDatasource: AuthDatasource,
    ) {}
    login(loginUserDto: LoginUserDto): Promise<User> {
        return this.authDatasource.login(loginUserDto)
    }
    
    register(registerUserDto: RegisterUserDto): Promise<User> {
        return this.authDatasource.register(registerUserDto)
    }

}