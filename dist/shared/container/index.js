"use strict";

var _tsyringe = require("tsyringe");
require("./providers");
var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");
var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");
var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");
var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");
var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");
var _RentalsRepository = require("../../modules/rentals/repositories/RentalsRepository");
var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);
_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);
_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);
_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);
_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImageRepository.CarsImagesRepository);
_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);
_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);