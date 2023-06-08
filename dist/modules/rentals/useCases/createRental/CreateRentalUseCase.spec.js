"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      brand: "Brand Test",
      category_id: "1163825e",
      daily_rate: 50,
      fine_amount: 20,
      license_plate: "TST-123"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12356",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another one open to  the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "12356",
      expected_return_date: dayAdd24Hours,
      user_id: "121212"
    });
    await expect(createRentalUseCase.execute({
      user_id: "121212",
      car_id: "234124",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There is a rental in progress for this user"));
  });
  it("should not be able to create a new rental if there is another one open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "121212"
    });
    await expect(createRentalUseCase.execute({
      user_id: "111111",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable"));
  });
  it("should not be able to create a new rental with invalid return type", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "12356",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return time"));
  });
});