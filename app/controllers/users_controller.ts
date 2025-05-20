import type { HttpContext } from '@adonisjs/core/http';
import { inject } from "@adonisjs/core";
import { UserService } from '#domain/services/user_service';
import { createUserValidator, updateUserValidator } from '#validators/user_validator';


@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index() {
    return (await this.userService.getAllUsers()).map((user) => user.toJson());
  }

  async store({ request }: HttpContext) {
    const { username, password, email } = await request.validateUsing(createUserValidator);
    return (await this.userService.createUser(username, password, email)).toJson();
  }

  async show({ params }: HttpContext) {
    return (await this.userService.getUserById(params.id)).toJson();
  }

  async update({ params, request }: HttpContext) {
    const { username, password, email } = await request.validateUsing(updateUserValidator);
    return (await this.userService.updateUser(params.id, { username, password, email })).toJson();
  }

  async destroy({ params }: HttpContext) {
    return (await this.userService.deleteUser(params.id)).toJson();
  }
}