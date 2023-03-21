import express from "express";
import 'dotenv/config';
import todoRouter from './presentation_layer/route'
import {connectionToDb} from "./utils/connection";
import {Command} from 'commander';

const program = new Command();
// const port: number = program.port;
const app = express();

let connectDb = connectionToDb();
app.use(express.json());

const a = program.parse(process.argv);
console.log({a})
const port: number = Number(a.args[0]) || 5000;
app.use('/api/v1/todo/', todoRouter);


// const logger = program.option('-p, --port <number>', 'port number');
// console.log({logger})
program.parse(process.argv);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
