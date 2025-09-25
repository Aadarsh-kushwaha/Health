const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const port = 8080;

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public"))); // static files serve

// Routes
app.get("/home", (req, res) => {
  res.render("home"); // home.ejs render karega
});

app.get("/signup", (req, res) => {
  res.render("signupPage");
});

app.get("/login", (req, res) => {
  res.render("login"); 
});


// login POST route 
app.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  res.redirect("/"); // login hone ke baad home page pe bhej diya
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});
