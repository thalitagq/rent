"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;
var _UserTokens = require("../../infra/typeorm/entities/UserTokens");
class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }
  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userTokens = new _UserTokens.UserTokens();
    Object.assign(userTokens, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userTokens);
    return userTokens;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
    return userToken;
  }
  async deleteById(id) {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1);
  }
  async findByRefreshToken(refresh_token) {
    const userTokens = this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
    return userTokens;
  }
}
exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;