import { DataSource } from "typeorm";
import { Task } from "./domain/entities/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Task],
  subscribers: [],
  migrations: ["src/**/migrations/*.{js,ts}"],
});

AppDataSource.initialize()
  .then(() => console.log("Database UP - OK"))
  .catch(console.error);
