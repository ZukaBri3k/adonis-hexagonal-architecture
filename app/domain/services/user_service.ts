import { inject } from "@adonisjs/core";
import { userContract } from "#infrastructure/contracts/user_contract";
import { UserRepository } from "#domain/repositories/user_repository";



@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<userContract | null> {
    const user = await this.userRepository.findById(id)

    return user ? new userContract({
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }) : null;
  }
}