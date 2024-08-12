import { PrismaClient } from "@prisma/client";
import { DB_NAME } from "../../constants.js";

const prisma = new PrismaClient();

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log(`DB is connected to ${DB_NAME}`);
    } catch (error) {
        console.log("Error while connecting to database", error);
        process.exit(1);
    }
};

export default connectToDatabase;
