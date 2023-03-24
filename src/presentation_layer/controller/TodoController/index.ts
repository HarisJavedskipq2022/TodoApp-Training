import { Request, Response } from "express";
import TodoService from "../../../services/TodoUtility";
// import {inject, injectable} from "inversify";

const todoService = new TodoService();

class TodoControllerInstance {
    constructor() {
    }

    async createTodos(req: Request, res: Response) {
        const { title, completed }: { title: string, completed: boolean } = req.body
        try {
            const record = await todoService.createTodoItem(title, completed)
            return res.json({ record, msg: "Successfully created todo" });

        } catch (e) {
            return res.json({
                msg: "failed to create todo",
                status: 500,
                route: "/create",
            });
        }
    }

    async createTodosFaker(req: Request, res: Response) {
         
            try {
                const record = await todoService.createTodoFaker()
                return res.json({ record, msg: "Successfully created todo" });
    
            } catch (e) {
                return res.json({
                    msg: "failed to create todo",
                    status: 500,
                    route: "/create",
                });
        
            }
        }

    async readTodos(req: Request, res: Response) {
        try {
            const limit = (req.query.limit as number | undefined) || 10;
            const offset = req.query.offset as number | undefined;

            const records = await todoService.findAllTodos(limit, offset);
            return res.json(records);
        } catch (e) {
            return res.json({
                msg: 'failed to read todo',
                status: 500,
                route: '/read',
            });
        }
    }

    async readById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const record = await todoService.readById(id);
            return res.json(record);
        } catch (e) {
            return res.status(500).json({
                msg: "failed to get todo by Id",
                route: '/read/:id',
            });
        }
    }



    async deleteTodoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedRecord = await todoService.deleteTodoById(id);
            return res.json({ record: deletedRecord });
        } catch (e) {
            return res.status(500).json({
                msg: "fail to read Todo",
                route: '/delete/:id',
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedRecord = await todoService.updateById(id);
            return res.json({ record: updatedRecord });
        } catch (e) {
            return res.status(500).json({
                msg: "todo not found",
                route: '/update/:id',
            });
        }
    }


}

export default new TodoControllerInstance()