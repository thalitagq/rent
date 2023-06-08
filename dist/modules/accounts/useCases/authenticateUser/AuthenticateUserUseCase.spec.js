"use strict";

var _AppError = require("../../../../shared/errors/AppError");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _CreateUserUseCase = require("../createuser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let createUserUseCase;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to add authenticate a user", async () => {
    const user = {
      driver_license: "111111111111",
      email: "user@test.com",
      password: "123456",
      name: "User Teste"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "123456"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "111111111111",
      email: "email@teste.com",
      name: "User Test",
      password: "123456"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "111111"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});