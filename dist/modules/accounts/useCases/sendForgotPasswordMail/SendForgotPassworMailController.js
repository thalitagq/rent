"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPassworMailController = void 0;
var _tsyringe = require("tsyringe");
var _SendForgotPassworMailUseCase = require("./SendForgotPassworMailUseCase");
class SendForgotPassworMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;
    const sendForgotPasswordMailUseCase = _tsyringe.container.resolve(_SendForgotPassworMailUseCase.SendForgotPassworMailUseCase);
    await sendForgotPasswordMailUseCase.execute(email);
    return response.send();
  }
}
exports.SendForgotPassworMailController = SendForgotPassworMailController;