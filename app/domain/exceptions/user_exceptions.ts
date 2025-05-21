export class UserNotFoundException extends Error {
  constructor(data: Object) {
    super(`User with id ${JSON.stringify(data)} not found`);
  }
}

export class UserAlreadyExistsException extends Error {
  constructor(username: string, mail: string) {
    super(`User with username ${username} or mail ${mail} already exists`);
  }
}

export class PasswordNotStrongEnoughException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class EmailNotValidException extends Error {
  constructor(email: string) {
    super(`Email ${email} is not valid`);
  }
}