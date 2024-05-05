import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {sequelize} from "./models/Database";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;


// parse requests of content-type - application/json
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }});
// Load routes for users
require("./routes/user.routes")(app);
require("./routes/group.routes")(app);
require("./routes/user.group.routes")(app);
require("./routes/expenseRoutes")(app);

// Load Database
(async () => {
    await sequelize.sync();
})();

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


