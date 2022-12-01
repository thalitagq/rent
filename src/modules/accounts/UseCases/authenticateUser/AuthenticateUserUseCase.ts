import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository";

interface IRequest{
  email: string;
  password: string
}

interface IResponse {
  user: {
    name: string,
    email:string
  },
  token: string
} 
  
@injectable()
class AuthenticateUserUseCase{

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({email, password}: IRequest): Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or Password incorrect");
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "0e36c7d3d232e5ec5ed602be059bb674", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {name: user.name, email: user.email}
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }