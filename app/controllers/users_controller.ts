import type { HttpContext } from '@adonisjs/core/http'
import { inject } from "@adonisjs/core";
import { UserService } from '#domain/services/user_service';


@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async getUserById({ params }: HttpContext) {
    return (await this.userService.getUserById(params.id))?.getUser();
  }
}