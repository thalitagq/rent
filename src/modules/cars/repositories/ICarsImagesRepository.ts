import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(car_is: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
