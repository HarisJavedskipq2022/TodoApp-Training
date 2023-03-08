import { Request, Response } from "express";
import 'dotenv/config';                                       
import { v4 as uuidv4 } from "uuid";                          
import { TodoInstance } from "../model/todo";
import { UserTableInstance } from "../model/usertable";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";     
                   

class TodoController {
  async create(req: Request,  res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully created todo" });
    } catch (e) {
      return res.json({
        msg: "failed to create todo",
        status: 500,
        route: "/create",
      });
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(records);
    } catch (e) {
      return res.json({
        msg: "failed to read todo",
        status: 500,
        route: "/read",
      });
    }
  }

  async readByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "failed to read todo",
        status: 500,
        route: "/read/:id",
      });
    }
  }

  async readUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await UserTableInstance.findAll({});
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "users not found",
        status: 500,
        route: "/getusers",
      });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserTableInstance.findOne({ where: { id } });
    if (!user) {
      return res.json({ msg: "user does not exist" });
    }

    const deleteUser = await user.destroy();

    return res.json({ user: deleteUser });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "record not found" });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/update/:id",
      });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "record not found" });
      }

      const updatedRecord = await record.update(
        { title: "focus on the training" },
        { where: { title: "drive a car" } }
      );
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: "failed to update",
        status: 500,
        route: "/update/:id",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "record does not exist" });
      }

      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/delete/:id",
      });
    }
  }

  async signup(req: Request, res: Response) {
    const id = uuidv4();

    const { email, password } = req.body;

    const user = await UserTableInstance.findOne({ where: { email: email } });

    if (user) {
      return res.json({ msg: "user already exists" });
    }

    const saltrounds = 10;
    const salt = await bcrypt.genSalt(saltrounds);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await UserTableInstance.create({
      email: email,
      password: hashedpassword,
      id,
    });

    return res.json({ newUser, msg: "user successfully signed up" });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserTableInstance.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }

    try {
      const validatePassword = await bcrypt.compare(password, user.password)
      
      if (!validatePassword) {
        res.send({ msg: "invalid credentials" });
      }
      
      const secretKey = process.env.JWT_SECRET_KEY as string
      const token = jwt.sign({id: user.id, email: user.email }, secretKey)
      res.send({msg: token})

    } catch (e) {
      res.status(500).send();
    }
  }
}

export default new TodoController();
