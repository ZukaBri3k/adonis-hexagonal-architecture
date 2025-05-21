import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { User } from "#domain/entities/user_entity";
import { UserMapper } from "#domain/mappers/user_mapper";
import { UserRepository } from "#domain/ports/user_repository";
import LucidModelUser from "#models/lucid_model_user";


export class LucidUserRepository implements UserRepository {

  async findById(id: number): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    return UserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await LucidModelUser.all();

    return users.map((user) => UserMapper.toDomain(user));
  }

  async create(userProps: CreateUserDTO): Promise<User> {
    const user = await LucidModelUser.create(userProps);

    return UserMapper.toDomain(user);
  }

  async update(id: number, userProps: UpdateUserDTO): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    user.username = userProps.username ?? user.username;
    user.password = userProps.password ?? user.password;
    user.email = userProps.email ?? user.email;

    await user.save();

    return UserMapper.toDomain(user);
  }

  async delete(id: number): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    await user.delete();

    return UserMapper.toDomain(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await LucidModelUser.findByOrFail('email', email);

    return UserMapper.toDomain(user);
  }

  async updatePassword(user: User, newPassword: string): Promise<User> {
    const userDb = await LucidModelUser.findOrFail(user.id);

    userDb.password = newPassword;

    await userDb.save();

    return UserMapper.toDomain(userDb);
  }
}