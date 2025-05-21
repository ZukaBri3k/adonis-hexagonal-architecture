export class WrongCredentialsException extends Error {
    constructor() {
        super('Wrong credentials');
    }
}

export class NotLoggedInException extends Error {
    constructor() {
        super('User is not logged in');
    }
}

export class FailedResetPasswordException extends Error {
    constructor() {
        super('Failed to reset password');
    }
}