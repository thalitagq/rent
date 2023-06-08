"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostgresCategoriesRepository = void 0;
class PostgresCategoriesRepository {
  findByName(name) {
    console.log(name);
    return null;
  }
  list() {
    return null;
  }
  create({
    name,
    description
  }) {
    console.log(name, description);
  }
}
exports.PostgresCategoriesRepository = PostgresCategoriesRepository;