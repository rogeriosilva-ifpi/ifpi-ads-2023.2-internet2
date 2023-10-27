import "dotenv/config";
import express from "express";
import "reflect-metadata";

import { AppDataSource } from './data-source';
import { Task } from "./domain/entities/Task";

const app = express();

const ds = AppDataSource
const taskRepo = ds.getRepository(Task)

app.get("/", (req, res) => res.json({ ok: "ok!" }));

app.get('/add', async (req, res) => {
  const task = new Task()
  task.name = 'Correr hoje ou amanhã - DM!'
  // await task.save()
  // await ds.manager.save(task)
  await taskRepo.save(task)

  return res.json(task)
})

app.get('/list', async (req, res) => {
  // const tasks = await ds.manager.find(Task)
  const tasks = await taskRepo.find()
  return res.json(tasks)
})

app.listen(3333, () => {
  console.log("Server UP --> http://localhost:3333");
});
