import {users} from "../database/config.js";

// middleware like logger
export const morgan = (req, res, next) => {
  console.log(` URL: ${req.path} and the method is ${req.method}`);
  next(); // will continue to the next middleware or to the router handlers
};
// only send data to valid email middleware
export const auth = (req, res, next) => {
  const {email} = req.body;
  const matchedEmail = users.find((user) => user.email === email);
  if (matchedEmail) {
    next();
  } else {
    const error = new Error(`Invalid email`);
    next(error);
    // res.status(403).send("Not Authroized user");
  }
};

export const handleError = (error, req, res, next) => {
  res.status(403).send(error.message);
};
