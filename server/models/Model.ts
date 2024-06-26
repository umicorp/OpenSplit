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
    },},
{
    timestamps: false,
    },);

export const Expense = sequelize.define("Expense", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paidBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    settleUp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    owed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }},    {
    timestamps: false },
);

export const ChildExpense = sequelize.define("ChildExpense", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,}
    },
    {
    timestamps: false,
    },
);

export const UserGroup = sequelize.define("UserGroup", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

// Associations
Group.belongsToMany(User, { through: UserGroup , onDelete: "CASCADE"});

User.belongsToMany(Group, { through: UserGroup });

Expense.belongsToMany(UserGroup, { through: "UserGroupExpense", onDelete: "CASCADE" });

UserGroup.belongsToMany(Expense, { through: "UserGroupExpense", onDelete: "CASCADE" });

Expense.hasMany(ChildExpense, {onDelete: "CASCADE" });
ChildExpense.belongsTo(Expense, {onDelete: "CASCADE"});
