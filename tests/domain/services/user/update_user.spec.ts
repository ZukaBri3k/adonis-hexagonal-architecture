import { UserNotFoundException } from '#domain/exceptions/user_exceptions';
import { UserRepository } from '#domain/ports/user_repository';
import { UserService } from '#domain/services/user_service';
import { Email } from '#domain/valueObjects/email_vo';
import { Password } from '#domain/valueObjects/password_vo';
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner'

test.group('UpdateUser', (group) => {
  // We swap the UserRepository with our mock
  group.setup(async () => {
    app.container.swap(UserRepository, () => {
      return new MockUserRepository();
    });
  });

  // We restore the UserRepository after the test
  group.teardown(() => {
    app.container.restore(UserRepository);
  })

  test('Should update user when user exists', async ({ assert }) => {
    const userService = await app.container.make(UserService)

    const user = await userService.updateUser(1, {email: new Email("test2@mail.com"), password: new Password("NewPassword1234!"), username: "test2"})

    assert.instanceOf(user, UserContract)
    assert.equal(user.toEntity().email, "test2@mail.com")
    assert.equal(user.toEntity().username, "test2")
    assert.equal(user.toEntity().password, "NewPassword1234!")
  })

  test('Should throw UserNotFoundException when user is not found', async ({ assert }) => {
    const userService = await app.container.make(UserService)
    try {
      await userService.updateUser(2, {email: new Email("test2@mail.com"), password: new Password("NewPassword1234!"), username: "test2"})
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, UserNotFoundException);
    }
  })
})