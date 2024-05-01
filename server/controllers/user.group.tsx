import {User} from "../models/Model";
import {Group} from "../models/Model";
import {user} from "./user.controller";


// Add a user to a group
 const addGroup = async (req, res) => {
    const userid = req.body.userid;
    const groupid = req.body.groupid;

    const user =  await User.findByPk(userid);
    const group = await Group.findByPk(groupid);

    if (user === null) {
        res.status(400).send({message: `Cannot find User with id=${userid}. Maybe User was not found or req.body is empty!`});
    } else if (group === null) {
        res.status(400).send({message: `Cannot find Group with id=${groupid}. Maybe Group was not found or req.body is empty!`});
    }
    const userGroups = await user.addGroup(group);
    console.log(userGroups);
    res.send(userGroups);

};

// Remove a user from a group
const removeGroup = async (req, res) => {
    const userid = req.body.userid;
    const groupid = req.body.groupid;

    const user =  await User.findByPk(userid);
    const group = await Group.findByPk(groupid);


    if (user === null) {
        res.send({message: `Cannot find User with id=${userid}. Maybe User was not found or req.body is empty!`});
    } else if (group === null) {
        res.send({message: `Cannot find Group with id=${groupid}. Maybe Group was not found or req.body is empty!`});
    }
    const userGroups = await user.removeGroup(group);
    res.send(userGroups);

};

// Get a user from a group
const getUsersFromGroup = async (req, res) => {
    const groupid = req.params.id;
    const group = await Group.findByPk(groupid);

    if (group === null) {
        res.send({message: `Cannot find Group with id=${groupid}. Maybe Group was not found or req.body is empty!`});
    }
    const usersInGroup = await group.getUsers();
    console.log(group);
    console.log(usersInGroup);
    res.send(usersInGroup);


};

export const userGroup ={
    addGroup,
    removeGroup,
    getUsersFromGroup
};