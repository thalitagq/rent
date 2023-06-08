import { SES } from "aws-sdk"
import fs from "fs";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import handlebars from "handlebars";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
        credentials: {
          secretAccessKey: process.env.AWS_ACCESS_KEY_ID_SECRET,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        }, 
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <thalitagq0@gmail.com>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
