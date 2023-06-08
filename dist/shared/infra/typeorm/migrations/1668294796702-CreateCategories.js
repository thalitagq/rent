"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategories1668294796702 = void 0;
var _typeorm = require("typeorm");
class CreateCategories1668294796702 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "categories",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable("categories");
  }
}
exports.CreateCategories1668294796702 = CreateCategories1668294796702;