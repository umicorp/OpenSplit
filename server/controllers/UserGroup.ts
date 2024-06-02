import {User} from "../models/Model";
import {Group} from "../models/Model";
import {user} from "./UserController";
import {UserGroup} from "../models/Model";
import {Expense} from "../models/Model";
import {ChildExpense} from "../models/Model";
import {array} from "prop-types";
import {getUsersinGroups} from "../helpers/common";
import {ExpenseParticipant} from "../types/Types";



// Add a user to a group
// @ts-ignore
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

    // @ts-ignore
     const userGroups = await user.addGroup(group);
    const allUsersinGroup = await getUsersinGroups()
    res.send(allUsersinGroup);

};

// Remove a user from a group
// @ts-ignore
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
    // @ts-ignore;
    const userGroups = await user.removeGroup(group);
    res.send(userGroups);

};

// @ts-ignore
const getUsersFromGroup = async (req, res) => {
    const groupid = req.params.id;
    const group = await Group.findByPk(groupid);

    if (group === null) {
        res.send({message: `Cannot find Group with id=${groupid}. Maybe Group was not found or req.body is empty!`});
    }
    const usergroup = await UserGroup.findOne({where: {GroupId: groupid}});
    if (usergroup === null) return res.send([]);
    // @ts-ignore;
    const usersInGroup = await group.getUsers({joinTableAttributes: [], attributes: ['id', "name"] });
    res.send(usersInGroup);


};

// @ts-ignore
const addExpense = async (req, res) => {
    const participants = req.body.participants; // [{'userid': '10'},{..}]
    const groupId = req.body.groupId;
    const name = req.body.name;
    const totalAmount = req.body.totalAmount;
    const settleUp = req.body.settleUp;
    const owed = req.body.owed;
    const paidBy = req.body.paidBy.id;
    const date = req.body.date

    // Create an Expense
    const expenseCreation = {
        name: name,
        totalAmount: totalAmount,
        paidBy: paidBy,
        owed: owed,
        settleUp: settleUp,
        date: date
    };
    const createdExpense = await Expense.create(expenseCreation);

    for (const participant of participants) {
        // Create a child expense
            const childExpense = {
                name: name,
                amount: participant.amount,
                userId: participant.userId
            };
            const createdChildExpense = await ChildExpense.create(childExpense);
            // @ts-ignore
            await createdChildExpense.setExpense(createdExpense);
            const userGroup = await UserGroup.findOne({where: {GroupId: groupId, UserId: participant.userId}})
            // @ts-ignore;
            const linkExpenseUserGroup = await createdExpense.addUserGroup(userGroup);
    }
    res.send(req.body);

};

// Get all expenses in a group
// @ts-ignore;

const getAllExpenses = async (req, res) => {

    const usergroup = await UserGroup.findOne({where: {GroupId: req.query.groupid, UserId: req.query.userid}});
    if (usergroup === null) return res.send([]);
    // @ts-ignore;
    const expenses = await usergroup.getExpenses();
    const expensesForGroup = []
    for (const expense of expenses){
        let childExpenses  = await expense.getChildExpenses();
        let participants: ExpenseParticipant[] = []
        let expenseToSend = {"id": expense.id,
                        "name": expense.name,
                        "totalAmount": expense.totalAmount,
                        "paidBy": await User.findByPk(expense.paidBy),
                        "owed": expense.owed,
                        "date": expense.date,
                        "settleUp": expense.settleUp,
                        "participants": participants
        }
        for (const childExpense of childExpenses) {
            participants.push({userId: childExpense.userId, amount: childExpense.amount })

            expenseToSend["participants"] = participants
        }
        expensesForGroup.push(expenseToSend)
    }

    res.send(expensesForGroup)
}

// @ts-ignore;
const deleteExpense = async (req, res) => {
    const expenseId = req.body.expenseid;
    const expenseFound = await Expense.findByPk(expenseId);

    // @ts-ignore
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