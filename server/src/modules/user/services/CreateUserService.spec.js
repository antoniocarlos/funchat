const FakeUserRepository = require('../repositories/FakeUserRepository');
const CreateUserService = require('./CreateUserService');

let fakeUserRepository;
let createUserService;

describe('Create a user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('Should be able to create a user', async () => {

    const user = await createUserService.create({
      userName: "test",
      email: "test@test.com",
      birthDate: "2000-12-10",
      password: "123456",
      confirmPassword: "123456",
      imageUrl: "www.img.com"
    });

    expect(user).toHaveProperty('id');
  });
});
