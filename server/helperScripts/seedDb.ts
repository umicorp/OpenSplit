import {User} from "../models/Model";
import {Group} from "../models/Model";
import {sequelize} from "../models/Database";

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
})();



