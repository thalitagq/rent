import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPassworMailUseCase } from "./SendForgotPassworMailUseCase";

class SendForgotPassworMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPassworMailUseCase
    );

    await sendForgotPasswordMailUseCase.execute(email)

    return response.send()
  }
}

export { SendForgotPassworMailController };
