"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;
var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");
class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }
  async create({
    name,
    description
  }) {
    const specitication = new _Specification.Specification();
    Object.assign(specitication, {
      description,
      name
    });
    this.specifications.push(specitication);
    return specitication;
  }
  async findByName(name) {
    return this.specifications.find(item => item.name === name);
  }
  async findByIds(ids) {
    const allSpecifications = await this.specifications.filter(item => ids.includes(item.id));
    return allSpecifications;
  }
}
exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;