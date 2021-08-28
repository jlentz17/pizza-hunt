const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });

  // use this to log mongo queries being executed
  await mongoose.set("debug", true);
}
start();
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
