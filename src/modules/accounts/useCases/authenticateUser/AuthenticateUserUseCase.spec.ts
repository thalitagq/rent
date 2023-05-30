import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createuser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to add authenticate a user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "111111111111",
      email: "user@test.com",
      password: "123456",
      name: "User Teste"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistent user", async() => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect"));
  })

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "111111111111",
      email: "email@teste.com",
      name: "User Test",
      password: "123456",
    };

    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "111111",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  })
})