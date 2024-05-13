import {User} from "../models/Model";
import {Group} from "../models/Model";
import {user} from "./UserController";
import {UserGroup} from "../models/Model";
import {Expense} from "../models/Model";
import {ChildExpense} from "../models/Model";
import {array} from "prop-types";



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

const addExpense = async (req, res) => {
    const useramounts = req.body.expense.useramounts; // [{'userid': '10'},{..}]
    const groupid = req.body.expense.groupid;
    const name = req.body.expense.name;
    const totalamount = req.body.expense.totalamount;
    const paidby = req.body.expense.paidby;

    // Create a Expense
    const expenseCreation = {
        name: name,
        totalAmount: totalamount,
        paidBy: paidby
    };
    const createdExpense = await Expense.create(expenseCreation);

    for (const useramount of useramounts) {
        // Create a child expense
        const childExpense = {
            name: name,
            amount: useramount.amount,
            userId: useramount.userid
        };
        const createdChildExpense = await ChildExpense.create(childExpense);
        await createdChildExpense.setExpense(createdExpense);
        const userGroup= await UserGroup.findOne({where: {GroupId: groupid, UserId: useramount.userid}});
        const linkExpenseUserGroup = await createdExpense.addUserGroup(userGroup);
    }
    res.send({message:"Expense Created"});
};

// Get all expenses in a group
const getAllExpenses = async (req, res) => {

    const usergroup = await UserGroup.findOne({where: {GroupId: req.query.groupid, UserId: req.query.userid}});
    if (usergroup === null) return res.send([]);

    const expenses = await usergroup.getExpenses();
    const expensesForGroup = []
    for (const expense of expenses){
        let childExpenses  = await expense.getChildExpenses();
        let participants = []
        let expenseToSend = {"id": expense.id,
                        "name": expense.name,
                        "totalAmount": expense.totalAmount,
                        "paidBy": await User.findByPk(expense.paidBy),
                        "owed": 0,
                        "participants": participants
        }
        for (const childExpense of childExpenses) {
            if (childExpense.userId === expense.paidBy) {
                expenseToSend["owed"] = expense.totalAmount - childExpense.amount;
            } else if (childExpense.userId != expense.paidBy) {
                participants.push({[childExpense.userId]: childExpense.amount })
                expenseToSend["participants"] = participants
            }
        }
        expensesForGroup.push(expenseToSend)
    }

    res.send(expensesForGroup)
}

const deleteExpense = async (req, res) => {
    const expenseId = req.body.expenseid;
    const expenseFound = await Expense.findByPk(expenseId);
    await expenseFound.destroy();
    res.send({message:"Expense Deleted"});

};

export const userGroup ={
    addGroup,
    removeGroup,
    getUsersFromGroup,

    getAllExpenses,
    addExpense,
    deleteExpense
};