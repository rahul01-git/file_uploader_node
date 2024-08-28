// imports
const fs = require("fs");

const multer = require("multer");
const express = require("express");

// initialize
const app = express();
const PORT = 8000;
const uploadDest = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${uploadDest}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

if (!fs.existsSync(uploadDest)) {
  fs.mkdirSync(uploadDest);
}

//middlewares
app.use(express.static(uploadDest));
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) res.status(201).send("File upload succesfully !!");
  else res.status(400).send("File upload failed");
});

//spin serever
app.listen(PORT, console.log(`Server running at: http://localhost:${PORT}`));
