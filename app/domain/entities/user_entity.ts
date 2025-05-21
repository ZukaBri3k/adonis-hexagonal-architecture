import { UserMapper } from "#domain/mappers/user_mapper";
import { userContract } from "#infrastructure/adapters/contracts/user_contract";
import { Token } from "./token_entity.js";

export interface UserProps {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type UserId = number;

export class User {
  id: UserId;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  isLoggedIn: boolean = false;
  tokens: Token[] = [];

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  purgeExpiredTokens() {
    this.tokens = this.tokens.filter((token) => token.expiresAt > new Date());
  }
}