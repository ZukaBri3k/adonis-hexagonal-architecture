import { LoginDTO } from "#domain/dto/auth_dto";
import { CreateUserDTO } from "#domain/dto/user_dto";
import { WrongCredentialsException, NotLoggedInException, FailedResetPasswordException } from "#domain/exceptions/auth_exceptions";
import { UserMapper } from "#domain/mappers/user_mapper";
import { AuthRepository } from "#domain/ports/auth_repository";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";
import { inject } from "@adonisjs/core";
import { UserService } from "./user_service.js";
import { MailRepository } from "#domain/ports/mail_repository";
import { TokenType } from "#domain/entities/token_entity";
import { TokenService } from "./token_service.js";
import { ExpiredTokenException, WrongTypeTokenException } from "#domain/exceptions/token_exceptions";
import { Password } from "#domain/valueObjects/password_vo";


@inject()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userService: UserService,
    private mailRepository: MailRepository,
    private tokenService: TokenService,) {}

  async login(credentials: LoginDTO): Promise<userContract> {
    try {
      const user = await this.authRepository.login(credentials);

      user.login();

      return UserMapper.toContract(user);
    } catch (error) {
      throw new WrongCredentialsException();
    }
  }

  async logout(): Promise<userContract> {
    try {
      const user = await this.authRepository.logout();

      user.logout();

      return UserMapper.toContract(user);
    } catch (error) {
      throw new NotLoggedInException();
    }
  }

  async register(props: CreateUserDTO): Promise<userContract> {
    const user = await this.userService.createUser(props);

    await this.login({ email: props.email, password: props.password });

    return user;
  }

  async isLoggedIn(): Promise<boolean> {
    return this.authRepository.isLoggedIn();
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      const user = (await this.userService.getUserByEmail(email)).toEntity();

      // We don't throw an error if the user doesn't exist beacause we don't want to expose the fact that the user doesn't exist
      if (!user) return;

      const token = (await this.tokenService.create(user, TokenType.RESET_PASSWORD)).toEntity();

      await this.mailRepository.sendPasswordResetEmail(email, token);
    } catch {
      // We do nothing
    }
  }

  async resetPassword(tokenValue: string, newPassword: string): Promise<userContract> {
    try {
      const token = (await this.tokenService.findByToken(tokenValue)).toEntity();
      newPassword = new Password(newPassword).getValue();

      if (token.type !== TokenType.RESET_PASSWORD) throw new WrongTypeTokenException({token, type: TokenType.RESET_PASSWORD});
      if (token.expiresAt < new Date()) throw new ExpiredTokenException({token});

      const user = (await this.userService.getUserById(token.userId)).toEntity();

      const newUser = await this.userService.updatePassword(user, newPassword);

      await this.tokenService.delete(token.token);

      return newUser;
    } catch {
      throw new FailedResetPasswordException();
    }
  }
}