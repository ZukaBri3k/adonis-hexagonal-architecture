import { Token, TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";
import { TokenMapper } from "#domain/mappers/token_mapper";
import { TokenRepository } from "#domain/ports/token_repository";
import LucidTokenModel from "#models/lucid_model_token";


export class LucidTokenRepository implements TokenRepository {
    
    async create(user: User, type: TokenType): Promise<Token> {
        const token = await LucidTokenModel.create({
            userId: user.id,
            type,
        })

        console.log(token);
        console.log(TokenMapper.toDomain(token));

        return TokenMapper.toDomain(token);
    }

    async delete(tokenValue: string): Promise<Token> {
        const token = await LucidTokenModel.findByOrFail('token', tokenValue);

        await token.delete();

        return TokenMapper.toDomain(token);
    }

    async findByToken(tokenValue: string): Promise<Token> {
        const token = await LucidTokenModel.findByOrFail('token', tokenValue);

        return TokenMapper.toDomain(token);
    }
}
