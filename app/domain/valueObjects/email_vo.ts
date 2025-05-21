import { EmailNotValidException } from "#domain/exceptions/user_exceptions";

export class Email {
  constructor(private email: string) {
    this.validate();
  }

  validate() {
    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new EmailNotValidException(this.email);
    }
  }

  getValue() {
    return this.email;
  }
}