/* eslint-disable no-undef */
import FakeUserRepository from '../repositories/FakeUserRepository';
import CreateUserService from './CreateUserService';
import ListUsersService from './ListUsersService';

let fakeUserRepository;
let listUsersService;
let createUserService;

describe('List users', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUsersService = new ListUsersService(fakeUserRepository);
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('Should be able to list users', async () => {
    const user1 = await createUserService.create({
      userName: 'test',
      email: 'test@test.com',
      birthDate: '2000-12-10',
      password: '123456',
      confirmPassword: '123456',
      imageUrl: 'www.img.com',
    });

    const user2 = await createUserService.create({
      userName: 'test2',
      email: 'test2@test.com',
      birthDate: '2000-12-10',
      password: '123456',
      confirmPassword: '123456',
      imageUrl: 'www.img.com',
    });

    const users = await listUsersService.listAll();

    expect(users).toEqual([user1, user2]);
  });
});
