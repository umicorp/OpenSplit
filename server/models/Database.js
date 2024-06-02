"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "database/sqlite-db.db"
});
