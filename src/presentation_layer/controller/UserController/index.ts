import { Request, Response } from "express";
import UserService from "../../../services/UserUtility";


const userService = new UserService();


class UserControllerInstance {
    constructor() { }


    async readUsers(req: Request, res: Response) {
        try {
            const record = await userService.readUsers();
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
            const { id } = req.params;
            const deletedUser = await userService.deleteUserById(id);
            return res.json({ user: deletedUser });
        } catch (e) {
            return res.json({
                msg: "User not found",
            });
        }
    }

    async signup(req: Request, res: Response) {
        const { email, password }: { email: string, password: string } = req.body;

        try {
            const newUser = await userService.signUp(email, password);

            console.log({ newUser })

            return res.json({ newUser, msg: 'User successfully signed up' });
        } catch (error) {
            return res.status(400).json({ error: "user already exists" });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password }: { email: string, password: string } = req.body;

        try {
            const token = await userService.loginUser(email, password);

            console.log({ token })
            res.json({ msg: "successfully logged in" });

            console.log({ token })
        } catch (e) {
            res.status(401).json({ error: "invalid credentials" });
        }
    }

}


export default new UserControllerInstance();