import { inject } from "@adonisjs/core";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";
import { UserRepository } from "#domain/ports/user_repository";
import { UpdateUserDTO } from "#domain/dto/user_dto";
import { UserMapper } from "#domain/mappers/user_mapper";



@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<userContract> {
    const user = await this.userRepository.findById(id);

    return UserMapper.toContract(user);
  }

  async getAllUsers(): Promise<userContract[]> {
    return (await this.userRepository.findAll()).map((user) => UserMapper.toContract(user));
  }

  async createUser(username: string, password: string, email: string): Promise<userContract> {
    const user = await this.userRepository.create({ username, password, email });

    return UserMapper.toContract(user);
  }

  async updateUser(id: number, userProps: UpdateUserDTO): Promise<userContract> {
    const user = await this.userRepository.update(id, userProps);

    return UserMapper.toContract(user);
  }

  async deleteUser(id: number): Promise<userContract> {
    const user = await this.userRepository.delete(id);

    return UserMapper.toContract(user);
  }
}