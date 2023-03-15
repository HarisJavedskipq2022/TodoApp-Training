import express from "express";
import 'dotenv/config';            
import todoRouter from './presentation_layer/route'         
import { connectionToDb } from "./utils/connection";           

const port = process.env.PORT;
const app = express();


connectionToDb();
app.use(express.json());

app.use('/api/v1/todo/', todoRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
