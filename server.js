require("dotenv").config(".env");

const express = require("express");
const fs = require("fs");
const { execSync } = require("child_process");
const cors = require("cors");

const app = new express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const fetchWebsite = (url) => {
  execSync(`wget -q -O - ${url} > site.html`, (error, stdout, stderr) => {
    if (error !== null) {
      return false;
    }
  });
};

app.get("/", async (req, res) => {
  try {
    fs.writeFileSync("site.html", "", () => console.log("Created site.html"));
    fs.createReadStream("site.html").pipe(res);
    fetchWebsite("https://clideo.com/editor/");
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening at port: ", PORT);
});

module.exports = app;
