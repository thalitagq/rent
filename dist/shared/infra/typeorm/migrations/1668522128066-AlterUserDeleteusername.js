"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteusername1668522128066 = void 0;
var _typeorm = require("typeorm");
class AlterUserDeleteusername1668522128066 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }
  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }
}
exports.AlterUserDeleteusername1668522128066 = AlterUserDeleteusername1668522128066;