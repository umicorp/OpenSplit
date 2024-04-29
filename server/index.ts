import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {sequelize} from "./models/Database";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;


// parse requests of content-type - application/json
app.use(express.json());
// Load routes for users
require("./routes/user.routes")(app);


(async () => {
    await sequelize.sync({alter:true});
})();

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


