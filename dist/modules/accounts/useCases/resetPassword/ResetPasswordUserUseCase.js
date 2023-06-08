"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;
var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");
var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("@shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(usersTokensRepository, dateProvider, usersRepositry) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepositry = usersRepositry;
  }
  async execute({
    token,
    password
  }) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new _AppError.AppError("Invalid Token");
    }
    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new _AppError.AppError("Expired Token");
    }
    const user = await this.usersRepositry.findById(userToken.user_id);
    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepositry.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;