const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const Url = require("./models/url");
require("dotenv").config();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const urls = await Url.find();
  res.render("Home", { urls: urls });
});

app.post("/shorturls", async (req, res) => {
  const newUrl = new Url({ fullurl: req.body.fullurl });
  await newUrl.save();
  res.redirect("/");
});

app.get("/:shorturl", async (req, res) => {
  const url = req.params.shorturl;
  const shorturl = await Url.findOne({ shorturl: url });
  if (!shorturl) res.send("not found").status(404);

  shorturl.clicks++;
  await shorturl.save();

  res.redirect(shorturl.fullurl);
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
