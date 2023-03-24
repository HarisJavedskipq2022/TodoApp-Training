import "reflect-metadata";
import express from "express";
import 'dotenv/config';
import router from "./presentation_layer/route";
import {connectionToDb} from "./utils/connection";
import {Command} from 'commander';

const program = new Command();
// const port: number = program.port;
const app = express();

let connectDb = connectionToDb();
app.use(express.json());

const a = program.parse(process.argv);
const port = Number(a.args[0]) || process.env.PORT;
app.use('/api/v1/todo/', router);
program.option('-p, --port <number>', 'port number')

// const logger = program.option('-p, --port <number>', 'port number');
// console.log({logger})
// program.parse(process.argv);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
