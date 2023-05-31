import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPassworMailUseCase } from "./SendForgotPassworMailUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import exp from "constants";

let sendForgotPasswordMailUseCase: SendForgotPassworMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPassworMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "739596",
      email: "florence@mail.com",
      name: "Florence Douglas",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("florence@mail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password email if user doesn't exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("lal@larajlod.zm")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create a new user token", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "817283",
      email: "alcile@tupko.sm",
      name: "Virgie Turner",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("alcile@tupko.sm");

    expect(generateTokenMail).toHaveBeenCalled()
  });
});
