import { inject } from "@adonisjs/core";
import { UserRepository } from "#domain/ports/user_repository";
import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { UserMapper } from "#domain/mappers/user_mapper";
import { UserAlreadyExistsException, UserNotFoundException } from "#domain/exceptions/user_exceptions";
import { User } from "#domain/entities/user_entity";
import { UserContract } from "#infrastructure/adapters/contracts/user_contract";


/**
 * Service for user management
 * 
 * @class
 * @name UserService
 * @kind class
 * @exports
*/
@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}


  /**
   * Retrieve a UserContract by its id
   * 
   * @async
   * @method
   * @name getUserById
   * @kind method
   * @memberof UserService
   * @param {number} id
   * @returns {Promise<UserContract>}
   */
  async getUserById(id: number): Promise<UserContract> {
    try {
      const user = await this.userRepository.findById(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({ id });
    }
  }


  /**
   * Get all users
   * 
   * @async
   * @method
   * @name getAllUsers
   * @kind method
   * @memberof UserService
   * @returns {Promise<UserContract[]>}
   */
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
    try {
      const user = await this.userRepository.create(props);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserAlreadyExistsException(props.username, props.email.getValue());
    }
  }


  /**
   * Update a user by its id and throw an exception if the user is not found
   * 
   * @async
   * @method
   * @name updateUser
   * @kind method
   * @memberof UserService
   * @param {number} id
   * @param {UpdateUserDTO} userProps
   * @returns {Promise<UserContract>}
   */
  async updateUser(id: number, userProps: UpdateUserDTO): Promise<UserContract> {
    try {

      const user = await this.userRepository.update(id, userProps);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({ id });
    }
  }

  /**
   * Delete a user by its id and return the deleted user, throw an exception if the user is not found
   * 
   * @async
   * @method
   * @name deleteUser
   * @kind method
   * @memberof UserService
   * @param {number} id
   * @returns {Promise<UserContract>}
   */
  async deleteUser(id: number): Promise<UserContract> {
    try {
      const user = await this.userRepository.delete(id);
      return UserMapper.toContract(user);
    } catch (error) {
      throw new UserNotFoundException({ id });
    }
  }


  /**
   * Retrieve a UserContract by its email and throw an exception if the user is not found
   * 
   * @async
   * @method
   * @name getUserByEmail
   * @kind method
   * @memberof UserService
   * @param {string} email
   * @returns {Promise<UserContract>}
   */
  async getUserByEmail(email: string): Promise<UserContract> {
    try {
      return UserMapper.toContract(await this.userRepository.getUserByEmail(email));
    } catch {
      throw new UserNotFoundException({ email });
    }
  }


  /**
   * Update a user password and throw an exception if the user is not found
   * 
   * @async
   * @method
   * @name updatePassword
   * @kind method
   * @memberof UserService
   * @param {User} user
   * @param {string} newPassword
   * @returns {Promise<UserContract>}
   */
  async updatePassword(user: User, newPassword: string): Promise<UserContract> {
    try {
      return UserMapper.toContract(await this.userRepository.updatePassword(user, newPassword));
    } catch {
      throw new UserNotFoundException({ id: user.id });
    }
  }
}