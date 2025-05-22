import { TokenType } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";
import { TokenCreationException, TokenNotFoundException } from "#domain/exceptions/token_exceptions";
import { TokenMapper } from "#domain/mappers/token_mapper";
import { TokenRepository } from "#domain/ports/token_repository";
import { TokenContract } from "#infrastructure/adapters/contracts/token_contract";
import { inject } from "@adonisjs/core";

@inject()
/**
 * All services related to tokens
 * 
 * @class
 * @name TokenService
 * @kind class
 * @exports
 */
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  /**
   * Retrieve a token by its value and throw an exception if the token is not found
   * 
   * @async
   * @method
   * @name findByToken
   * @kind method
   * @memberof TokenService
   * @param {string} tokenValue
   * @returns {Promise<TokenContract>}
   */
  async findByToken(tokenValue: string): Promise<TokenContract> {
    try {
      return TokenMapper.toContract(await this.tokenRepository.findByToken(tokenValue));
    } catch {
      throw new TokenNotFoundException({ tokenValue });
    }
  }

  /**
   * Create a new token and throw an exception if the token already exists
   * 
   * @async
   * @method
   * @name create
   * @kind method
   * @memberof TokenService
   * @param {User} user
   * @param {TokenType} type
   * @returns {Promise<TokenContract>}
   */
  async create(user: User, type: TokenType): Promise<TokenContract> {
    try {
      return TokenMapper.toContract(await this.tokenRepository.create(user, type));
    } catch {
      throw new TokenCreationException({ user, type });
    }
  }

  /**
   * Delete a token by its value and return the deleted token, throw an exception if the token is not found
   * 
   * @async
   * @method
   * @name delete
   * @kind method
   * @memberof TokenService
   * @param {string} tokenValue
   * @returns {Promise<TokenContract>}
   */
  async delete(tokenValue: string): Promise<TokenContract> {
    try {
      return TokenMapper.toContract(await this.tokenRepository.delete(tokenValue));
    } catch {
      throw new TokenNotFoundException({ tokenValue });
    }
  }
}
