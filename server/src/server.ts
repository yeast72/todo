import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./connect";
import router from "./routes";

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const db = "mongodb+srv://wsr:1234@node-couse-tgrvm.mongodb.net/todo";
connect({ db });

app.listen(8080, () =>
  console.log("Application started successfully on port 8080")
);
