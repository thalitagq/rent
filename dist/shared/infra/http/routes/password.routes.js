"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;
var _ResetPasswordUserController = require("@modules/accounts/useCases/resetPassword/ResetPasswordUserController");
var _SendForgotPassworMailController = require("@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassworMailController");
var _express = require("express");
const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPassworMailController.SendForgotPassworMailController();
const resetPassworUserController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPassworUserController.handle);