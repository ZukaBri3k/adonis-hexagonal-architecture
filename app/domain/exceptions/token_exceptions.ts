import { Token, TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";

export class TokenNotFoundException extends Error {
    constructor(tokenValue: Object) {
        super(`Token not found: ${JSON.stringify(tokenValue)}`);
    } 
}

export class TokenCreationException extends Error {
    constructor({user, type}: {user: User, type: TokenType}) {
        super(`Token creation failed for user: ${JSON.stringify(user)} and type: ${type}`);
    }
}

export class WrongTypeTokenException extends Error {
    constructor({token, type}: {token: Token, type: TokenType}) {
        super(`Token type ${token.type} is not equal to ${type}`);
    }
}

export class ExpiredTokenException extends Error {
    constructor({token}: {token: Token}) {
        super(`Token expired: ${JSON.stringify(token)}`);
    } 
}
    