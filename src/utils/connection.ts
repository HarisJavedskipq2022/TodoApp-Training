import db from "../config/database.config";


export const connectionToDb = async () => {
    return db.sync().then(() => {
    console.log("database is connected");
  })
};