import { inject } from "@adonisjs/core";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";
import { UserRepository } from "#domain/ports/user_repository";
import { UpdateUserDTO } from "#domain/dto/user_dto";



@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<userContract> {
    const user = await this.userRepository.findById(id);

    return new userContract({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async getAllUsers(): Promise<userContract[]> {
    return (await this.userRepository.findAll()).map((user) => new userContract({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async createUser(username: string, password: string, email: string): Promise<userContract> {
    const user = await this.userRepository.create({ username, password, email });

    return new userContract({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async updateUser(id: number, userProps: UpdateUserDTO): Promise<userContract> {
    const user = await this.userRepository.update(id, userProps);

    return new userContract({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async deleteUser(id: number): Promise<userContract> {
    const user = await this.userRepository.delete(id);

    return new userContract({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}