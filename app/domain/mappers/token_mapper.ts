import { Token } from "#domain/entities/token_entity";
import { TokenContract } from "#infrastructure/adapters/contracts/token_contract";

export class TokenMapper {
    static toDomain(data: any): Token {
        return new Token(data)
    }

    static toContract(data: Token): TokenContract {
        return new TokenContract({
            token: data.token,
            type: data.type,
            expiresAt: data.expiresAt,
            userId: data.userId
        })
    }
}