require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Book = require("./model/books");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/user')

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//PORT
const port = 8000;

Book.find({})
.then(()=>console.log("OK"))
.catch((err)=>console.log(err))

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});