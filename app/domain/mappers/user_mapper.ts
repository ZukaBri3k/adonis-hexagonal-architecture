import { User } from "#domain/entities/user_entity";
import { UserContract } from "#infrastructure/adapters/contracts/user_contract";

export class UserMapper {
  static toDomain(data: any): User {
    return new User(data)
  }

  static toContract(data: User): UserContract {
    return new UserContract({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}