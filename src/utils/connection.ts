import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function connectionToDb(): Promise<void> {
    
    prisma.$connect().then(() => { 
    console.log("Connected to database");
    }).catch((err) => {
        console.log(err, "connection failed");
    }).then(() => {
        prisma.$disconnect();
    })
  }