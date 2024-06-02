import {userGroup} from "../controllers/UserGroup";
import Router from 'express';

// @ts-ignore;
module.exports = app => {
    const router = Router();

    // add a user to a group
    router.post("/", userGroup.addExpense);
    // remove a expense from a user
    router.delete("/", userGroup.deleteExpense);
    // get all expenses from group
    router.get("/", userGroup.getAllExpenses);

    app.use("/api/expense", router);
};