const express = require("express");
const app = express();
const router = require("./routes.js");
// const cors = require("cors");

app.use(express.json());
// app.use(cors());
app.use(router);

app.listen(2000, () => {
  console.log(`Example app listening on port ${2000}`);
});
