import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import { UserService } from '#domain/services/user_service';
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.';
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';
import { User } from '#domain/entities/user_entity';
import { Email } from '#domain/valueObjects/email_vo';
import { Password } from '#domain/valueObjects/password_vo';
import { UserNotFoundException } from '#domain/exceptions/user_exceptions';


test.group('User update password', (group) => {
  // We swap the UserRepository with our mock
  group.setup(async () => {
    app.container.swap(UserService, () => {
      return new UserService(new MockUserRepository());
    });
  });

  // We restore the UserRepository after the test
  group.teardown(() => {
    app.container.restore(UserService);
  })

  test('Should update password when user exists', async ({ assert }) => {
    const userService = await app.container.make(UserService)
    const user = (await userService.getUserById(1)).toEntity()

    const updatedUser = await userService.updatePassword(user, "NewPassword1234!")

    assert.instanceOf(updatedUser, UserContract)
    assert.equal(updatedUser.toEntity().password, "NewPassword1234!")
  })

  test('Should throw UserNotFoundException when user is not found', async ({ assert }) => {
    const userService = await app.container.make(UserService)
    const user = new User({id: 2, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date()})

    try {
      await userService.updatePassword(user, "NewPassword1234!")
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, UserNotFoundException);
    }
  })
})