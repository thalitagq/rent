import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userTokens = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userTokens;
  }
}

export { UsersTokensRepositoryInMemory };
