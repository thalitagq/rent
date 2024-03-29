import multer from "multer";
import crypto from "crypto"
import { resolve } from "path";

//"..", ".." --> volta do local que este arquivo esta para a raiz do projeto
const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export default {
  tmpFolder,
  storage: multer.diskStorage({

    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};