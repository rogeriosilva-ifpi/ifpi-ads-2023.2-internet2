import "dotenv/config";
import express from "express";
import "reflect-metadata";

const app = express();

app.get("/", (req, res) => res.json({ ok: "ok!" }));

app.listen(3333, () => {
  console.log("Server UP --> http://localhost:3333");
});
