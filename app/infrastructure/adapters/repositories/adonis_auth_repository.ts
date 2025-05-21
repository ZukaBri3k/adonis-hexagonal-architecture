import { LoginDTO } from "#domain/dto/auth_dto";
import { Token } from "#domain/entities/token_entity";
import { User } from "#domain/entities/user_entity";
import { UserMapper } from "#domain/mappers/user_mapper";
import { AuthRepository } from "#domain/ports/auth_repository";
import { MailRepository } from "#domain/ports/mail_repository";
import LucidModelUser from "#models/lucid_model_user";
import { inject } from "@adonisjs/core";
import { HttpContext } from '@adonisjs/core/http';


@inject()
export class AdonisAuthRepository implements AuthRepository {
  constructor(private ctx: HttpContext, private mailRepository: MailRepository) {}

  async login(credentials: LoginDTO): Promise<User> {
    const user = await LucidModelUser.verifyCredentials(credentials.email, credentials.password);
    const { auth } = this.ctx;

    await auth.use('web').login(user);

    return UserMapper.toDomain(user);
  }

  async logout() {
    const { auth } = this.ctx;

    const user = await auth.use('web').authenticate()

    await auth.use('web').logout();

    return UserMapper.toDomain(user);
  }

  async isLoggedIn(): Promise<boolean> {
    const { auth } = this.ctx;

    const user = await auth.use('web').authenticate()

    return user !== null;
  }

  async sendPasswordReset(email: string, token: Token): Promise<void> {
    await this.mailRepository.sendPasswordResetEmail(email, token);
  }
}
