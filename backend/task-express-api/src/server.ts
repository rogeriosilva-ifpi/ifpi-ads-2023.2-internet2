import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Task } from "./domain/entities/Task";

const app = express();

const ds = AppDataSource;

app.get("/", (req, res) => res.json({ ok: "ossk!" }));

app.get("/add", (req, res) => {
  const task = new Task();
  task.name = "Testando...";
  task.description = "Tarefa de teste...";
  task.save();
  // ds.manager.save(task);
  return res.status(200).json("Saved");
});

app.listen(3333, () => {
  console.log("Server UP --> http://localhost:3333");
});
