export interface UserProps {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class User {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}