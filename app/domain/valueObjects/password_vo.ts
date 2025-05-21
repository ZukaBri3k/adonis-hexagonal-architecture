import { PasswordNotStrongEnoughException } from "#domain/exceptions/user_exceptions";

export class Password {
  constructor(private password: string) {
    this.validate();
  }

  validate() {
    if (this.password.length < 6) {
      throw new PasswordNotStrongEnoughException('Password must be at least 6 characters long');
    }
    if (this.password.length > 50) {
      throw new PasswordNotStrongEnoughException('Password must be at most 50 characters long');
    }
    if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,50}$/)) {
      throw new PasswordNotStrongEnoughException('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
    }
  }

  getValue() {
    return this.password;
  }
}