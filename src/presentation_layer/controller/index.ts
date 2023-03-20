import {Request, Response} from "express";
import TodoService from "../../services/TodoUtility";

class ControllerInstance {
    async createTodos(req: Request, res: Response) {
        const {title, completed}: { title: string, completed: boolean } = req.body
        try {
            const record = await TodoService.createTodoItem(title, completed)
            return res.json({record, msg: "Successfully created todo"});

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

            const records = await TodoService.findAllTodos(limit, offset);
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
            const {id} = req.params;
            const record = await TodoService.readById(id);
            return res.json(record);
        } catch (e) {
            return res.status(500).json({
                msg: "failed to get todo by Id",
                route: '/read/:id',
            });
        }
    }

    async readUsers(req: Request, res: Response) {
        try {
            const record = await TodoService.readUsers();
            return res.json(record);
        } catch (e) {
            return res.status(500).json({
                msg: "unable to read users",
                route: '/getusers',
            });
        }
    }

    async deleteUsers(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const deletedUser = await TodoService.deleteUserById(id);
            return res.json({user: deletedUser});
        } catch (e) {
            return res.json({
                msg: "User not found",
            });
        }
    }

    async deleteTodoById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const deletedRecord = await TodoService.deleteTodoById(id);
            return res.json({record: deletedRecord});
        } catch (e) {
            return res.status(500).json({
                msg: "fail to read Todo",
                route: '/delete/:id',
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const updatedRecord = await TodoService.updateById(id);
            return res.json({record: updatedRecord});
        } catch (e) {
            return res.status(500).json({
                msg: "todo not found",
                route: '/update/:id',
            });
        }
    }

    async signup(req: Request, res: Response) {
        const {email, password}: { email: string, password: string } = req.body;

        try {
            const newUser = await TodoService.signUp(email, password);
            console.log({newUser})

            return res.json({newUser, msg: 'User successfully signed up'});
        } catch (error) {
            return res.status(400).json({error: "user already exists"});
        }
    }

    async login(req: Request, res: Response) {
        const {email, password}: { email: string, password: string } = req.body;

        try {
            const token = await TodoService.loginUser(email, password);
            res.json({msg: "successfully logged in"});

            console.log({token})
        } catch (e) {
            res.status(401).json({error: "invalid credentials"});
        }
    }
}

export default new ControllerInstance()