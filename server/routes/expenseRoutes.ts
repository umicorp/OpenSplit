import {userGroup} from "../controllers/user.group";
import Router from 'express';

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