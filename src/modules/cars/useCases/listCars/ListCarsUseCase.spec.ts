import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMermory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMermory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMermory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMermory.create({
      brand: "Brand",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "categoryId",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMermory.create({
      brand: "Brand100",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "categoryId",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Brand100",
    });

    expect(cars).toEqual([car]);
  });
});
