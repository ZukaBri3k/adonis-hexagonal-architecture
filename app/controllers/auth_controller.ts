import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from "#domain/services/auth_service";
import { inject } from "@adonisjs/core";
import { emailValidator } from '#validators/user_validator';

@inject()
export default class AuthController {
    constructor(private authService: AuthService) {}

    async login({request} : HttpContext) {
      const { email, password } = request.only(['email', 'password']);
      return (await this.authService.login({email, password})).toJson();
    }

    async logout() {
      return (await this.authService.logout()).toJson();
    }

    async register({request} : HttpContext) {
      const { username, email, password } = request.only(['username', 'email', 'password']);
      return (await this.authService.register({username, email, password})).toJson();
    }

    async sendPasswordReset({request} : HttpContext) {
      const { email } = await request.validateUsing(emailValidator);

      await this.authService.sendPasswordReset(email);
    }

    async resetPassword({request} : HttpContext) {
      const { token, password } = request.only(['token', 'password']);
      return (await this.authService.resetPassword(token, password)).toJson();
    }
}