import {db, users} from "../database/config.js";

export const getAllUsers = (req, res) => {
  res.send(users);
};

export const getOneUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let matchedUser = await users.find((user) => user.id === id);
  matchedUser ? res.send(matchedUser) : res.send("no user found");
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const updateUser = users.find((user) => user.id === id);

  updateUser.name = req.body.name;
  await db.write();
  res.send(updateUser);
};

export const deleteOneUser = (req, res) => {
  const {id} = req.params;

  const indexToDelete = users.findIndex((user) => user.id === id);
  if (indexToDelete > -1) {
    users.splice(indexToDelete, 1);

    db.write();
    res.send(users);
  }
};

export const addNewUser = async (req, res) => {
  const data = req.body;

  users.push(data);

  await db.write();
  res.send(users[users.length - 1]);
};
