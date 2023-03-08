"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
require("dotenv/config");
const route_1 = __importDefault(require("./todo/route"));
//  Connection to database
database_config_1.default.sync().then(() => {
    console.log("database is connected");
});
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(route_1.default);
// Todo items CRUD API
// app.post("/create", async (req: Request, res: Response) => {
//   const id = uuidv4();
//   try {
//     const record = await TodoInstance.create({ ...req.body, id });
//     return res.json({ record, msg: "Successfully create todo" });
//   } catch (e) {
//     return res.json({ msg: "fail to create", status: 500, route: "/create" });
//   }
// });
// app.get("/read", async (req: Request, res: Response) => {
//   try {
//     const records = await TodoInstance.findAll({ where: {} })
//     return res.json(records)
//   } catch (e) {
//     return res.json({ msg: "failed to read", status: 500, route: "/read" });
//   }
// });
// app.get("/read/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const record = await TodoInstance.findOne({ where: { id } })
//     return res.json(record)
//   } catch (e) {
//     return res.json({ msg: "failed to read", status: 500, route: "/read/:id" });
//   }
// });
// app.put("/updateCompleted/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const record = await TodoInstance.findOne({ where: { id } })
//     if (!record) {
//       return res.json({ msg: "record not found" })
//     }
//     const updatedRecord = await record.update({ completed: !record.getDataValue('completed') })
//     return res.json({ record: updatedRecord })
//   } catch (e) {
//     return res.json({ msg: "failed to update", status: 500, route: "/update/:id" });
//   }
// });
// app.put("/updateTitle/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const record = await TodoInstance.findOne({ where: { id } })
//     if (!record) {
//       return res.json({ msg: "record not found" })
//     }
//     const updatedRecord = await record.update({ title: "to check api's are working or not" }, { where: { title: "updating a todo" } })
//     return res.json({ record: updatedRecord })
//   } catch (e) {
//     return res.json({ msg: "failed to update", status: 500, route: "/update/:id" });
//   }
// });
// app.delete("/delete/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const record = await TodoInstance.findOne({ where: { id } })
//     if (!record) {
//       return res.json({ msg: "record not found" })
//     }
//     const deleteRecord = await record.destroy()
//     return res.json({ record: deleteRecord })
//   } catch (e) {
//     return res.json({ msg: "failed to delete", status: 500, route: "/delete/:id" });
//   }
// });
// // Authentication API
// app.post('/register', async (req: Request, res: Response) => {
// })
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
