import "reflect-metadata";

const express = require("express");
import { DataSource } from "typeorm";
import { User } from "./entity/User";
const app = express();
const port = 3000;

app.get("/", async (req: any, res: any) => {
  const userRepo = AppDataSource.getRepository(User);
  const tosave = new User();
  tosave.email = "xs@Gmail.com";
  tosave.lastName = "pass";
  tosave.firstName = "deepak";
  tosave.id = 5;

  let allData = await userRepo.update(1, {
    firstName: "rahul",
    lastName: "tiwari",
    email: "rahul@gmail.com",
  });
  res.json(allData);
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "person",
  entities: ["src/entity/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});
AppDataSource.initialize()
  .then(() =>
    app.listen(port, () =>
      console.log(`Example app listening on port - ${port}!`)
    )
  )
  .catch((e) => console.log("error while connection:" + e));
