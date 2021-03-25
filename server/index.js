const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/products.js");
const categoryRoutes = require("./routes/categories.js");
const avatarRoutes = require("./routes/avatars.js");
const claimRoutes = require("./routes/claims.js");
const orderRoutes = require("./routes/orders.js");
const reviewRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");
const fileRoutes = require("./routes/files.js");
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');



mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

var app = express();

// json setup
app.use(bodyParser.json({ limit: "60mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use(cors());

// routes
app.use("/reviews", reviewRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/avatars", avatarRoutes);
app.use("/claims", claimRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// mongoDB setup
// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL =
  "mongodb+srv://admin:admin123@cluster0.pdxx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
const conn = mongoose.createConnection(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch(error => console.log(error.message));

mongoose.set("useFindAndModify", false);


// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "server/images")));
// app.use("/api", fileRoutes);


// create storage engine
const storage = new GridFsStorage({
  url: CONNECTION_URL,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

const upload = multer({ storage });

app.use('/files', fileRoutes(upload));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});
