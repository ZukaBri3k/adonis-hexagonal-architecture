import vine from '@vinejs/vine';

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(25).unique({table: 'users', column: 'username'}),
    password: vine.string().trim().minLength(6).maxLength(50),
    email: vine.string().trim().email().unique({table: 'users', column: 'email'}),
  })
);

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(25).unique({table: 'users', column: 'username'}).optional(),
    password: vine.string().trim().minLength(6).maxLength(50).optional(),
    email: vine.string().trim().email().unique({table: 'users', column: 'email'}).optional(),
  })
);