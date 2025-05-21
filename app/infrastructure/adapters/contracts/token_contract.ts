import { TokenProps } from "#domain/entities/token_entity";
import { TokenMapper } from "#domain/mappers/token_mapper";

export class TokenContract {
    constructor(private tokenProps: TokenProps) {}

    toJson() {
        return {
            token: this.tokenProps.token,
            type: this.tokenProps.type,
            expiresAt: this.tokenProps.expiresAt
        }
    }

    toEntity() {
        return TokenMapper.toDomain(this.tokenProps);
    }
}
