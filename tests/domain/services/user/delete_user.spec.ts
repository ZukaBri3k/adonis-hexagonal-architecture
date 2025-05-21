import { UserNotFoundException } from '#domain/exceptions/user_exceptions';
import { UserRepository } from '#domain/ports/user_repository';
import { UserService } from '#domain/services/user_service';
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner'

test.group('User delete user', (group) => {
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

  test('Should delete user when user exists', async ({ assert }) => {
    const userService = await app.container.make(UserService)

    const user = await userService.deleteUser(1)

    assert.instanceOf(user, UserContract)
  })

  test('Should throw UserNotFoundException when user is not found', async ({ assert }) => {
    const userService = await app.container.make(UserService)
    try {
      await userService.deleteUser(2)
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, UserNotFoundException);
    }
  })
})