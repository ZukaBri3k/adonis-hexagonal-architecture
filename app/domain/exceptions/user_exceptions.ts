export class UserNotFoundException extends Error {
  constructor(id: number) {
    super(`User with id ${id} not found`);
  }
}

export class UserAlreadyExistsException extends Error {
  constructor(username: string, mail: string) {
    super(`User with username ${username} or mail ${mail} already exists`);
  }
}