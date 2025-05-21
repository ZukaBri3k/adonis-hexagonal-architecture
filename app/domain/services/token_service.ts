import { Token, TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";
import { TokenCreationException, TokenNotFoundException } from "#domain/exceptions/token_exceptions";
import { TokenRepository } from "#domain/ports/token_repository";
import { inject } from "@adonisjs/core";

@inject()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async findByToken(tokenValue: string): Promise<Token> {
    try {
      return this.tokenRepository.findByToken(tokenValue);
    } catch {
      throw new TokenNotFoundException({ tokenValue });
    }
  }

  async create(user: User, type: TokenType): Promise<Token> {
    try {
      return this.tokenRepository.create(user, type);
    } catch {
      throw new TokenCreationException({ user, type });
    }
  }

  async delete(tokenValue: string): Promise<Token> {
    try {
      return await this.tokenRepository.delete(tokenValue);
    } catch {
      throw new TokenNotFoundException({ tokenValue });
    }
  }
}
