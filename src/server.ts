import express, {  } from "express";
import db from "./config/database.config";
import 'dotenv/config';            
import todoRouter from "./todo/route";                       


//  Connection to database

db.sync().then(() => {
  console.log("database is connected");
});

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/v1/", todoRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
