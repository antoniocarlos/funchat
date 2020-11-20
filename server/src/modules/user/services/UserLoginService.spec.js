const FakeUserRepository = require('../repositories/FakeUserRepository');
const CreateUserService = require('./CreateUserService');
const UserLoginService = require('./UserLoginService');

let fakeUserRepository;
let userLoginService;
let createUserService;

describe('Login user', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
    userLoginService = new UserLoginService(fakeUserRepository);
  });


  it('Should be able to login user', async () => {

    await createUserService.create({
      userName: "test",
      email: "test@test.com",
      birthDate: "2000-12-10",
      password: "123456",
      confirmPassword: "123456",
      imageUrl: "www.img.com"
    });
    
    const user = await userLoginService.login("test@test.com", "123456");

    expect(user).toHaveProperty('token');
  });
});