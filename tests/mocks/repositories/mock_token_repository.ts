import { TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";
import { TokenRepository } from "#domain/ports/token_repository";
import { Token } from "#domain/entities/token_entity";

export class MockTokenRepository implements TokenRepository {
  async create(user: User, type: TokenType): Promise<Token> {
    if (user.id !== 1) {
      throw new Error("Token already exists");
    }

    return new Promise((resolve) => resolve(new Token({
      token: "testToken",
      type,
      expiresAt: new Date(),
      userId: user.id,
    })));
  }

  async delete(tokenValue: string): Promise<Token> {
    if (tokenValue !== "testToken") {
      throw new Error("Token not found");
    }

    return new Promise((resolve) => resolve(new Token({
      token: tokenValue,
      type: TokenType.RESET_PASSWORD,
      expiresAt: new Date(),
      userId: 1,
    })));
  }

  async findByToken(tokenValue: string): Promise<Token> {
    if (tokenValue !== "testToken") {
      throw new Error("Token not found");
    }

    return new Promise((resolve) => resolve(new Token({
      token: tokenValue,
      type: TokenType.RESET_PASSWORD,
      expiresAt: new Date(),
      userId: 1,
    })));
  }
}
