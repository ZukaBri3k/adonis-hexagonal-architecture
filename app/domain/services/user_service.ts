import { inject } from "@adonisjs/core";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";
import { UserRepository } from "#domain/ports/user_repository";
import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { UserMapper } from "#domain/mappers/user_mapper";
import { UserAlreadyExistsException, UserNotFoundException } from "#domain/exceptions/user_exceptions";



@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<userContract> {
    try {
      const user = await this.userRepository.findById(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }

  async getAllUsers(): Promise<userContract[]> {
    return (await this.userRepository.findAll()).map((user) => UserMapper.toContract(user));
  }

  async createUser(props: CreateUserDTO): Promise<userContract> {
    try {
      const user = await this.userRepository.create(props);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserAlreadyExistsException(props.username, props.email);
    }
  }

  async updateUser(id: number, userProps: UpdateUserDTO): Promise<userContract> {
    try {
      const user = await this.userRepository.update(id, userProps);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }

  async deleteUser(id: number): Promise<userContract> {
    try {
      const user = await this.userRepository.delete(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }
}