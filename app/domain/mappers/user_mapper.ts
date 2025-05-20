import { User } from "#domain/entities/user_entity";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";

export class UserMapper {
  static toDomain(data: any): User {
    return new User(data)
  }

  static toContract(data: User): userContract {
    return new userContract({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}