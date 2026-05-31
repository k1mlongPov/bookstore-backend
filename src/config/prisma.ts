import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
import{ PrismaClient} from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

prisma.$connect().then(() => {
    console.log('Connection Database Successfully')
}).catch((error: any) => {
    console.error(error);
});

export default prisma;