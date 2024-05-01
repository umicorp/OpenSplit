import {DataTypes} from "sequelize";
import {sequelize} from "./Database";

export const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },});

export const Group = sequelize.define("Group", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },});

export const Expense = sequelize.define("Expense", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },});


// Associations
// Group.hasMany(User);
Group.belongsToMany(User, { through: "UserGroup" });

// User.hasMany(Group);
User.belongsToMany(Group, { through: "UserGroup" });
// User.hasMany(Expense);

