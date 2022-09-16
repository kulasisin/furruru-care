if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const port = 3000;
const ip = "127.0.0.1";
// render
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// passport
const flash = require("express-flash");
const session = require("express-session");
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

const initializePassport = require("./passport-config");
const users = [];
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login2", (req, res) => {
  res.render("login2", { name: "kulas" });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/booking", (req, res) => {
  res.render("booking");
});
app.get("/caretakers", (req, res) => {
  res.render("caretakers");
});
app.get("/schedule", (req, res) => {
  res.render("schedule");
});
app.get("/cam", (req, res) => {
  res.render("cam");
});
// users login

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/about",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
  console.log(req.body);
});

app.listen(port, ip, () =>
  console.info(`server is ruuning at  http://${ip}:${port}`)
);
