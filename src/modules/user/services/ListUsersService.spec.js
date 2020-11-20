const FakeUserRepository = require('../repositories/FakeUserRepository');
const CreateUserService = require('./CreateUserService');
const ListUsersService = require('./ListUsersService');

let fakeUserRepository;
let listUsersService;
let createUserService;

describe('List users', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUsersService = new ListUsersService(fakeUserRepository);
    createUserService = new CreateUserService(fakeUserRepository);
  });


  it('Shoud be able to list users', async () => {

    const birthDate = new Date("2015-03-25");

    const user1 = await createUserService.create({
      userName: "test",
      email: "test@test.com",
      birthDate,
      password: "123456",
      confirmPassword: "123456",
      imageUrl: "www.img.com"
    });

    const user2 = await createUserService.create({
      userName: "test2",
      email: "test2@test.com",
      birthDate,
      password: "123456",
      confirmPassword: "123456",
      imageUrl: "www.img.com"
    });

    const users = await listUsersService.listAll();

    expect(users).toEqual([user1, user2]);
  });
});