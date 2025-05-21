import { PasswordNotStrongEnoughException, UserAlreadyExistsException } from '#domain/exceptions/user_exceptions';
import { UserRepository } from '#domain/ports/user_repository';
import { UserService } from '#domain/services/user_service';
import { Email } from '#domain/valueObjects/email_vo';
import { Password } from '#domain/valueObjects/password_vo';
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';

test.group('CreateUser', (group) => {
  // We swap the UserRepository with our mock
  group.setup(async () => {
    app.container.swap(UserRepository, () => {
      return new MockUserRepository();
    })
  })

  // We restore the UserRepository after the test
  group.teardown(() => {
    app.container.restore(UserRepository)
  })

  test('should create a user', async ({ assert }) => {
    
    const userService = await app.container.make(UserService)
    
    const user = await userService.createUser({
      email: new Email("test@mail.com"),
      password: new Password("Test1234!"),
      username: "test"
    })
    
    assert.instanceOf(user, UserContract)
    assert.equal(user.toEntity().email, "test@mail.com")
    assert.equal(user.toEntity().username, "test")
    assert.equal(user.toEntity().password, "Test1234!")
    assert.equal(user.toEntity().id, 1)
    assert.instanceOf(user.toEntity().createdAt, Date)
    assert.instanceOf(user.toEntity().updatedAt, Date)
  });

  test('should throw an exception if a user already exists with the same username or email', async ({ assert }) => {

    const userService = await app.container.make(UserService);

    await userService.createUser({
      email: new Email("test@mail.com"),
      password: new Password("Test1234!"),
      username: "test"
    });

    try {
      await userService.createUser({
        email: new Email("test@mail.com"),
        password: new Password("Test1234!"),
        username: "test"
      });
    } catch (error) {
      assert.instanceOf(error, UserAlreadyExistsException);
    }
  });

  test('should throw an exception if the password is not strong enough', async ({ assert }) => {

    const userService = await app.container.make(UserService);

    try {
      await userService.createUser({
        email: new Email("test@mail.com"),
        password: new Password("weakPassword"),
        username: "test"
      });

      assert.fail();
    } catch (error) {
      assert.instanceOf(error, PasswordNotStrongEnoughException, "Password is not strong enough but no exception was thrown");
    }
  });
});