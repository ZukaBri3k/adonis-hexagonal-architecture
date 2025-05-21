import { UserProps } from "#domain/entities/user_entity";
import { UserMapper } from "#domain/mappers/user_mapper";


export class userContract {
  private id: number;
  private username: string;
  private password: string;
  private email: string;
  private createdAt: Date;
  private updatedAt: Date | null;

  constructor(userProps: UserProps) {
    this.id = userProps.id;
    this.username = userProps.username;
    this.password = userProps.password;
    this.email = userProps.email;
    this.createdAt = userProps.createdAt;
    this.createdAt = userProps.createdAt;
    this.updatedAt = userProps.updatedAt;
  }

  toJson() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  getPassword() {
    return this.password;
  }

  toEntity() {
    return UserMapper.toDomain({
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}