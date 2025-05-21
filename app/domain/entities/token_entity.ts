import { UserId } from "./user_entity.js";

export enum TokenType {
  EMAIL_CONFIRMATION = "EMAIL_CONFIRMATION",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export interface TokenProps {
  token: string;
  type: TokenType;
  expiresAt: Date;
  userId: UserId
}

export class Token {
  public token: string;
  public type: TokenType;
  public expiresAt: Date;
  public userId: UserId;
  
  constructor(props: TokenProps){
    this.token = props.token;
    this.type = props.type;
    this.expiresAt = props.expiresAt;
    this.userId = props.userId;
  }
}