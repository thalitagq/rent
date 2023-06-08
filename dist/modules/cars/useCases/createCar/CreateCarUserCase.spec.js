"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _AppError = require("@shared/errors/AppError");
var _CreateCarUserCase = require("./CreateCarUserCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUserCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "category"
    });
    expect(car).toHaveProperty("id");
  });
  it("shold not be able to creat a car with existent license plate", async () => {
    await createCarUseCase.execute({
      brand: "Brand1",
      name: "Car1",
      description: "Description1",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "category1"
    });
    await expect(createCarUseCase.execute({
      brand: "Brand2",
      name: "Car2",
      description: "Description2",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "category2"
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("shold be able to creat a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand2",
      name: "Car Available",
      description: "Description2",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 50,
      category_id: "category2"
    });
    expect(car.available).toBe(true);
  });
});