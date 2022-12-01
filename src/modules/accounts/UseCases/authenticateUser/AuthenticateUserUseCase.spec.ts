import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createuser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
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

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "111111111111",
        email: "email@teste.com",
        name: "User Test",
        password: "123456"
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({ email: user.email, password: "111111"})
    }).rejects.toBeInstanceOf(AppError)
  })
})