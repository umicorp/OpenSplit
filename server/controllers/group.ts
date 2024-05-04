import {Group} from "../models/Model";

// Create and Save a new User
const create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Group
    const group = {
        name: req.body.name,
    };

    // Save Group in the database
    Group.create(group)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the group."
            });
        });
};

// Retrieve all Groups from the database.
const findAll = (req, res) => {
    Group.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Groups."
            });
        });
};

// Find a single Group with an id
const findOne = (req, res) => {
    const id = req.params.id;

    Group.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Group with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Group with id=" + id
            });
        });
};

// Delete a Group with the specified id in the request
const deleteGroup = (req, res) => {
    const id = req.params.id;

    Group.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Group was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Group with id=" + id
            });
        });
};


// Delete all groups from the database.
const deleteAll = (req, res) => {
    Group.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Group were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Group."
            });
        });
};

export const group ={
    create,
    findAll,
    findOne,
    deleteGroup,
    // update,
    deleteAll
};