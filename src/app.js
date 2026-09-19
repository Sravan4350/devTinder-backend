const { AuthUser, loginAuth } = require("./middlewares/Auth");

const express = require('express');
const app = express();

app.use("/admin", AuthUser);

app.get("/login", loginAuth, (req, res) => {
    res.send("Login page");
})

app.get("/admin/getUsers", (req, res) => {
    res.send("GET all users");
})

app.get("/admin/getUser", (req, res) => {
    res.send("GET user details");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})