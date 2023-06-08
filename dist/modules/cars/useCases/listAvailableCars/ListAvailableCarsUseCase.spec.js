"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMermory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMermory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMermory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMermory.create({
      brand: "Brand",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "categoryId"
    });
    const cars = await listAvailableCarsUseCase.execute({});
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
      category_id: "categoryId"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand100"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMermory.create({
      brand: "Brand100",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "categoryId"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMermory.create({
      brand: "Brand100",
      name: "Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "PLT1234",
      fine_amount: 50,
      category_id: "12345"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  });
});