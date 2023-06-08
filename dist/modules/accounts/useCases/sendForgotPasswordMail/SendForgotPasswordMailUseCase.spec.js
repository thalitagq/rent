"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _SendForgotPassworMailUseCase = require("./SendForgotPassworMailUseCase");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _AppError = require("../../../../shared/errors/AppError");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPassworMailUseCase.SendForgotPassworMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "739596",
      email: "florence@mail.com",
      name: "Florence Douglas",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("florence@mail.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a forgot password email if user doesn't exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("lal@larajlod.zm")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create a new user token", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "817283",
      email: "alcile@tupko.sm",
      name: "Virgie Turner",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("alcile@tupko.sm");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});