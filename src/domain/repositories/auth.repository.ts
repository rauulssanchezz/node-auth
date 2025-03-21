
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { User } from "../entities/user.entity";

export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<User>

    abstract register(registerUserDto: RegisterUserDto): Promise<User>
}