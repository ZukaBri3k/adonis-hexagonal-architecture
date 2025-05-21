import { inject } from "@adonisjs/core";
import { UserRepository } from "#domain/ports/user_repository";
import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { UserMapper } from "#domain/mappers/user_mapper";
import { UserAlreadyExistsException, UserNotFoundException } from "#domain/exceptions/user_exceptions";
import { Password } from "#domain/valueObjects/password_vo";
import { User } from "#domain/entities/user_entity";
import { UserContract } from "#infrastructure/adapters/contracts/user_contract";


@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<UserContract> {
    try {
      const user = await this.userRepository.findById(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({id});
    }
  }

  async getAllUsers(): Promise<UserContract[]> {
    return (await this.userRepository.findAll()).map((user) => UserMapper.toContract(user));
  }

  
  /**
   * Create a new user and throw an exception if the user already exists
   * 
   * @async
   * @method
   * @name createUser
   * @kind method
   * @memberof UserService
   * @param {CreateUserDTO} props
   * @returns {Promise<UserContract>}
   */
  async createUser(props: CreateUserDTO): Promise<UserContract> {
    const password = new Password(props.password);
    try {
      const user = await this.userRepository.create({...props, password: password.getValue()});
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserAlreadyExistsException(props.username, props.email);
    }
  }

  async updateUser(id: number, userProps: UpdateUserDTO): Promise<UserContract> {
    let password: string | undefined;

    if (userProps.password) {
      password = new Password(userProps.password).getValue();
    }
    
    try {

      const user = await this.userRepository.update(id, {...userProps, password});
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({id});
    }
  }

  async deleteUser(id: number): Promise<UserContract> {
    try {
      const user = await this.userRepository.delete(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({id});
    }
  }

  async getUserByEmail(email: string): Promise<UserContract> {
    try {
      return UserMapper.toContract(await this.userRepository.getUserByEmail(email));
    } catch {
      throw new UserNotFoundException({email});
    }
  }

  async updatePassword(user: User, newPassword: string): Promise<UserContract> {
    try {
      return UserMapper.toContract(await this.userRepository.updatePassword(user, newPassword));
    } catch {
      throw new UserNotFoundException({id: user.id});
    }
  }
}