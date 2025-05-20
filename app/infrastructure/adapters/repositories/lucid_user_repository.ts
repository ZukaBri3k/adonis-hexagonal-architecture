import { User } from "#domain/entities/user_entity";
import { UserRepository } from "#domain/repositories/user_repository";
import LucidModelUser from "#models/lucid_model_user";


export class LucidUserRepository implements UserRepository {
  toDomainModel(user: LucidModelUser): User {
    return new User({
      id: user.id,
      username: user.fullName,
      password: user.password,
      createdAt: user.createdAt.toJSDate(),
      updatedAt: user.updatedAt?.toJSDate() || null,
    });
  }

  async findById(id: number): Promise<User | null> {
    const user = await LucidModelUser.find(id);

    return user ? this.toDomainModel(user) : null;
  }
}