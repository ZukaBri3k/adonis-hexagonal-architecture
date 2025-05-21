import { Token, TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";

export abstract class TokenRepository {
    abstract create(user: User, type: TokenType): Promise<Token>;
    abstract delete(id: string): Promise<Token>;
    abstract findByToken(token: string): Promise<Token>;
}
