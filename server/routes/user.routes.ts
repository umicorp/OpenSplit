import {user} from "../controllers/user.controller";
import Router from 'express';

module.exports = app => {
    const users = user;

    const router = Router();

    // Create a new Users
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.deleteUser);

    // Delete all Users
    router.delete("/", users.deleteAll);

    app.use("/api/users", router);
};