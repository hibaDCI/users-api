import express from "express";
// you are gonna call express
const app = express();
app.get("/", (req, res, next) => {
  console.log("we are in get method before the try");
  const myError = new Error("here is the mistake");
  myError.type = "notfound";
  try {
    console.log("there is no error");
    // throw myError;
  } catch (error) {
    next(error); // will ignore all middleware if we call next with error
  }
});

app.use((req, res, next) => {
  console.log("hello before handling the error");
  next();
});

app.get("/", (req, res) => {
  console.log("the new onnennene");
  res.send({hi: "hello"});
});

app.get("/api", (req, res) => {
  console.log("hello from API");
  res.send({hi: "hello"});
});
// function to handle error

app.use((error, req, res, next) => {
  console.log(error, "our handling error occurred");

  next();
});

app.listen(5001, () => {
  console.log("your server is ready to serve");
});
