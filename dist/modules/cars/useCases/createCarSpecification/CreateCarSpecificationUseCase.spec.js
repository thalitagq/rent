"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");
var _SpecificationsRepositoryInMemory = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create car specifications", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a nonexistent car", async () => {
    const car_id = "1234";
    const specifications_id = ["1781"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists"));
  });
  it("should be able to add a new specification to he car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});