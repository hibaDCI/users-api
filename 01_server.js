// import all the dependencies
import express from "express";
import cors from "cors";
// import the controllers

import {
  addNewUser,
  deleteOneUser,
  getAllUsers,
  getOneUserById,
  updateUser,
} from "./controllers/users.controller.js";
// import the middleware

import {morgan, auth, handleError} from "./middleware/index.js";

//! import the routers
import usersRouter from "./routers/usersRouter.js";

// call and use express for
const app = express();
const PORT = process.env.PORT || 5000;

// built in middleware

app.use(express.urlencoded({extended: false}));

app.use(express.json());
// third party middleware

app.use(cors());

// our own middleware

app.use(morgan);

// our routes is here

// application.method(route , controller)

//! routers

app.get("/", (req, res) => {
  res.send("first route ");
});

// app.get("/users", auth, getAllUsers);
// app.post("/users", addNewUser);
// app.get("/users/:id", getOneUserById);

// app.put("/users/:id", updateUser);

// app.delete("/users/:id", deleteOneUser);

//! routers after creating routers app is

app.use("/users", usersRouter);

app.use(handleError);
app.listen(PORT, () => {
  console.log("the server is up and running on port " + PORT);
});
