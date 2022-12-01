import multer from "multer";
import crypto from "crypto"
import { resolve } from "path";

export default {
  upload(folder: string){
    return {
      storage: multer.diskStorage({
        //"..", ".." --> volta do local que este arquivo esta para a raiz do projeto
        destination: resolve(__dirname, "..", "..", folder), 
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex")
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}