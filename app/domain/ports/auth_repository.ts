import { LoginDTO } from "#domain/dto/auth_dto";
import { User } from "#domain/entities/user_entity";

export abstract class AuthRepository {
    
    abstract login(credentials: LoginDTO): Promise<User>;   
    abstract logout(): Promise<User>;
    abstract isLoggedIn(): Promise<boolean>;
}