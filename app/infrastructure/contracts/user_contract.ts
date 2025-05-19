import { UserProps } from "#domain/entities/user_entity";


export class userContract {
  private id: number;
  private fullName: string;
  private username: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date | null;

  constructor(userProps: UserProps) {
    this.id = userProps.id;
    this.fullName = userProps.username;
    this.username = userProps.username;
    this.password = userProps.password;
    this.createdAt = userProps.createdAt;
    this.createdAt = userProps.createdAt;
    this.updatedAt = userProps.updatedAt;
  }

  getUser() {
    return {
      id: this.id,
      fullName: this.fullName,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  getPassword() {
    return this.password;
  }
}