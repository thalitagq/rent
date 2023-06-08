"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;
var _express = require("express");
var _createSpecificationController = require("../../../../modules/cars/useCases/createSpecification/createSpecificationController");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _createSpecificationController.CreateSpecificationController();
specificationsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
specificationsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);