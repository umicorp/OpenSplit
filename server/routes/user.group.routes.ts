import {userGroup} from "../controllers/user.group";
import Router from 'express';

module.exports = app => {
    const user = userGroup;

    const router = Router();

    // add a user to a group
    router.post("/", userGroup.addGroup);
    // remove a user to a group
    router.delete("/", userGroup.removeGroup);
    // Get all users in a specific group
    router.get("/:id", userGroup.getUsersFromGroup);


    app.use("/api/usergroup", router);
};