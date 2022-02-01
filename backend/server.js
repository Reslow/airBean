const express = require("express");
const cookieParser = require("cookie-parser");
const nedb = require("nedb-promise");
const app = express();
const database = new nedb({ filename: "customers.db", autoload: true });

const bcryptFunctions = require("./bcrypt.js");
console.log(bcryptFunctions);

const menu = require("./menu.json");

app.use(express.static("../frontend"));
app.use(express.json());
app.use(cookieParser());

let accounts = [];

app.post("/api/auth/create", async (req, res) => {
  const credentials = req.body;
  console.log("SIGNING UP");

  let responsObject = {
    success: true,
    usernameExists: false,
    emailExists: false,
  };

  const usernameExists = await database.find({
    username: credentials.username,
  });

  const emailExists = await database.find({
    email: credentials.email,
  });
  if (usernameExists.length > 0) {
    responsObject.usernameExists = true;
  }
  if (emailExists.length > 0) {
    responsObject.emailExists = true;
  }

  if (usernameExists == true || responsObject.emailExists == true) {
    responsObject.success = false;
  } else {
    const hashedPassword = await bcryptFunctions.hashPassword(
      credentials.password
    );
    credentials.password = hashedPassword;
    database.insert(credentials);
  }

  res.json(responsObject);
});

app.post("/api/auth/login", async (req, res) => {
  const credentials = req.body;

  let responsObject = {
    success: false,
  };

  const account = await database.find({ username: credentials.username });
  console.log(account);

  if (account.length > 0) {
    const correctPassword = await bcryptFunctions.comparePassword(
      credentials.password,
      account[0].password
    );
    if (correctPassword) {
      responsObject.success = true;

      const cookieId = Math.round(Math.random() * 10000);

      database.update(
        { username: credentials.username },
        { $set: { cookie: cookieId } }
      );
      res.cookie("loggedIn", cookieId);
    }
  }
  res.json(responsObject);
});

app.get("/api/loggedIn", async (req, res) => {
  console.log("LOGGEDIN API");
  const cookie = req.cookies.loggedIn;

  let responsObject = {
    loggedIn: false,
  };

  const account = await database.find({ cookie: parseInt(cookie) });

  if (account.length > 0) {
    responsObject.loggedIn = true;
  }

  res.json(responsObject);
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("loggedIn");

  const responsObject = {
    success: true,
  };

  res.json(responsObject);
});

app.get("/api/deleteAccount", (req, res) => {
  let cookie = req.cookies.loggedIn;

  const responsObject = {
    success: true,
  };

  database.remove({ cookie: parseInt(cookie) });

  console.log(accounts);
  res.clearCookie("loggedIn");
  res.json(responsObject);
});

app.get("/coffee/menu", (req, res) => {
  // returning the menu
  res.json(menu);
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
