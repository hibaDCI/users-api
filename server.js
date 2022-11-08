// import all your packages

import express from "express";
// you are gonna call express
const app = express();
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
console.log(process.env.PORT);
/*
!
these are all extra regarding dotenv variables


dotenv.config({path: ".env.development"});

console.log(process.env.test);
console.log(process.env.MODE);


*/
// you should connect your server

// you would have something called middleware

//? middleware is functions we can run between the request and the response, any kind of function
//? the signature for those function they have next in the callback
//? the order of the function is important and matter
//? middle is squential,it's executed from top to bottom:
//? it has many jobs and
//1- run code
//2- end the request-response cycle
//3- it can change the req res object
//?call the next middleware

//! first middleware is to parse the data coming from the client or postman
// app.use(express.urlencoded({extended: false}));
//! second middleware is to pase the data comeing as a json formats,// built in middleware to parse the json data
app.use(express.json()); // by using this middleware we are able to recive a json format
//! create our middleware:
// endpoints
app.get("/hello", (req, res) => {
  console.log("this route is created before our console middleware is called");
  res.send("it's before the middleware");
});
//! another middleware
app.use((req, res, next) => {
  console.log("hoha we will interrupt you with our console middleware");
  next(); // to call the next middelware usually the one below
});
//! another middleware to work like morgan function
app.use((req, res, next) => {
  //   req.timeSended = new Date().getMonth();
  req.myName = "hiba";
  console.log(`method: ${req.method}\nBy:${req.myName}\n
  path: ${req.url}`);
  next();
});
// you would have your routers
const posts = [
  {title: "Hello java", id: 1},
  {title: "Hi Python", id: 2},
  {title: "welcome back user", id: 3},
];
app.get("/", (req, res) => {
  res.send(posts);
});
app.post("/api", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  (req, res) => {
    res.send("maybe we save your new post");
  }
);

app.post("/posts", (req, res) => {
  const newPost = {title: "My new post", id: Date.now()};
  posts.push(newPost);
  res.send(posts);
});

app.delete("/:id", async (req, res) => {
  const {id} = req.params;
  const newPosts = posts.filter((ele, index) => ele.id !== Number(id));
  /// we are using delete put just to differentiate we , localhost:5000/1 for all
  res.send(newPosts);
});

//!we will split them into different routes,the routes concerned with users in one file , if we have a coffee routes it will be in coffee routes
//
//! we can use middleware only in a specific path

//? the life cycle of the route is end when we response and end
app.put("/:id", async (req, res) => {
  let newPost = {title: "hello there 2023"};
  const {id} = req.params;
  console.log(typeof id);
  const newPosts = posts.filter((ele, index) => ele.id !== Number(id));
  console.log(newPosts);
  newPost.id = parseInt(id);

  newPosts.push(newPost);

  res.send(newPosts);
});
// let response = axios.get("https://randomuser.me/posts");
// console.log(response);
app.listen(5000, () => {
  console.log("your server is ready to serve");
});
