import {group} from "../controllers/Group";
import Router from 'express';

module.exports = app => {
    const groups = group;

    const router = Router();

    // Create a new Group
    router.post("/", groups.create);

    // Retrieve all Group
    router.get("/", groups.findAll);

    // Retrieve a single User with id
    router.get("/:id", groups.findOne);

    // // Update a User with id
    // router.put("/:id", groups.update);

    // Delete a User with id
    router.delete("/:id", groups.deleteGroup);

    // Delete all Groups
    router.delete("/", groups.deleteAll);

    app.use("/api/groups", router);
};