import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPassword/ResetPasswordUserController";
import { SendForgotPassworMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassworMailController";
import { Router } from "express"

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPassworMailController();
const resetPassworUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPassworUserController.handle);

export { passwordRoutes }