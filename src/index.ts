import express, {Request, Response} from "express";
import 'dotenv/config';            
import todoRouter from './presentation_layer/route'         
import { connectionToDb } from "./utils/connection";           

const port = process.env.PORT;
const app = express();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


connectionToDb();
app.use(express.json());


app.post("/todos", async (req: Request, res: Response) => {
  const { task, completed } = req.body;

  try {
    const todo = await prisma.todo.create({
      data: { task, completed },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create todo" });
  }
});

app.use('/api/v1/todo/', todoRouter);
app.listen(port, () => {

  console.log({port})

  console.log(`app is listening on port ${port}`);
});
