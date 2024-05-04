import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "sqlite-db.db"
  });


