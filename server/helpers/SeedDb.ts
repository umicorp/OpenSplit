import {Expense, Group, User, UserGroup} from "../models/Model";
import {sequelize} from "../models/Database";

async function  addUsersToGroup(user: User, group: Group): Promise<UserGroup> {
    const userObject = await User.findOne({where: { name: user }})
    const groupObject = await Group.findOne({where: { name: group }})

    const userGroups = await userObject.addGroup(groupObject);
}

// Load Database
(async () => {
    await sequelize.sync({force: true});
    await User.bulkCreate([
        {
            name: "umaid",
        },
        {
            name: "sheena",
        }]);

    await Group.bulkCreate([
        {
            name: "Morin",
        },
        {
            name: "Cruise",
        }
    ]);
    await addUsersToGroup("umaid", "Morin")
    await addUsersToGroup("sheena", "Morin")
})();



