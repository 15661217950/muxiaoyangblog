const express = require("express");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");

app.use(require("cors")());
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/", router);

const server = app.listen(3001, (req, res) => {
  console.log("blog listening at http://localhost:3001");
});
