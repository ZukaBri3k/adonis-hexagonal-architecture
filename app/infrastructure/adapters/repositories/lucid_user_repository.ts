import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { User } from "#domain/entities/user_entity";
import { UserRepository } from "#domain/ports/user_repository";
import LucidModelUser from "#models/lucid_model_user";


export class LucidUserRepository implements UserRepository {
  toDomainModel(user: LucidModelUser): User {
    return new User({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      createdAt: user.createdAt.toJSDate(),
      updatedAt: user.updatedAt?.toJSDate() || null,
    });
  }

  async findById(id: number): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    return this.toDomainModel(user);
  }

  async findAll(): Promise<User[]> {
    const users = await LucidModelUser.all();

    return users.map((user) => this.toDomainModel(user));
  }

  async create(userProps: CreateUserDTO): Promise<User> {
    const user = await LucidModelUser.create(userProps);

    return this.toDomainModel(user);
  }

  async update(id: number, userProps: UpdateUserDTO): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    user.username = userProps.username ?? user.username;
    user.password = userProps.password ?? user.password;
    user.email = userProps.email ?? user.email;

    await user.save();

    return this.toDomainModel(user);
  }

  async delete(id: number): Promise<User> {
    const user = await LucidModelUser.findOrFail(id);

    await user.delete();

    return this.toDomainModel(user);
  }
}