import {Expense, Group, UserGroup} from "../models/Model";
import exp from "node:constants";

// Create and Save a new Group
const create = async (req, res) => {
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
            console.log(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the group."
            });
        });

    const allGroups = await Group.findAll();
    const AllUsersAndGroups = []
    for (let group of allGroups){
        let usergroup = await group.getUsers({joinTableAttributes: [], attributes: ['id', "name"] })
        if (usergroup === null) usergroup = [];
        let UsersAndGroups = {group: group, users:usergroup }
        AllUsersAndGroups.push(UsersAndGroups)
    }
    res.send(AllUsersAndGroups)
};

// Retrieve all Groups from the database.
const findAll = async (req, res) => {
    const allGroups = await Group.findAll();

    const AllUsersAndGroups = []
    for (let group of allGroups){
        let usergroup = await group.getUsers({joinTableAttributes: [], attributes: ['id', "name"] })
        if (usergroup === null) usergroup = [];
        let UsersAndGroups = {group: group, users:usergroup }
        AllUsersAndGroups.push(UsersAndGroups)
    }
    res.send(AllUsersAndGroups)
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
// Deletes all expenses in the group as well
const deleteGroup = async (req, res) => {
    const id = req.params.id;
    const usergroup = await UserGroup.findOne({where: {GroupId: id}});
    if (usergroup != null) {
        const expenses = await usergroup.getExpenses();
        const expenseIDs = expenses.map(expense => expense.id);
        await Expense.destroy({ where: { id: expenseIDs }})
    }
    await Group.destroy({where: {id:id}})
    const allGroups = await Group.findAll();

    const AllUsersAndGroups = []
    for (let group of allGroups){
        let usergroup = await group.getUsers({joinTableAttributes: [], attributes: ['id', "name"] })
        if (usergroup === null) usergroup = [];
        let UsersAndGroups = {group: group, users:usergroup }
        AllUsersAndGroups.push(UsersAndGroups)
    }
    res.send(AllUsersAndGroups)
    // Group.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //
    //             Group.findAll()
    //                 .then(groups => {
    //                     res.send(groups)
    //                 });
    //         } else {
    //             res.status(404).send({
    //                 message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete Group with id=" + id
    //         });
    //     });
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