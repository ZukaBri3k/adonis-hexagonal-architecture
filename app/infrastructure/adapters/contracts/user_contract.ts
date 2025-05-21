import { UserProps } from "#domain/entities/user_entity";
import { UserMapper } from "#domain/mappers/user_mapper";


export class userContract {

  constructor(private userProps: UserProps) {

  }

  toJson() {
    return {
      id: this.userProps.id,
      username: this.userProps.username,
      email: this.userProps.email,
      createdAt: this.userProps.createdAt,
      updatedAt: this.userProps.updatedAt,
    };
  }

  toEntity() {
    return UserMapper.toDomain({
      id: this.userProps.id,
      username: this.userProps.username,
      password: this.userProps.password,
      email: this.userProps.email,
      createdAt: this.userProps.createdAt,
      updatedAt: this.userProps.updatedAt,
    });
  }
}