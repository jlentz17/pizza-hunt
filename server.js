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
  }).catch((err) => { console.error(err); });

  // use this to log mongo queries being executed
  mongoose.set("debug", true);
  mongoose.set('bufferCommands', false);
  
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
}
start();
