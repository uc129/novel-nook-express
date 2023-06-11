let express = require("express");

let dotenv = require("dotenv");
dotenv.config();
let logger = require("morgan");
let cors = require("cors");

let indexRouter = require("./routes/index.route");
let customersRouter = require("./routes/customers.routes");
let productRouter = require("./routes/products.routes");
let orderRouter = require("./routes/orders.routes");
let designerRouter = require("./routes/designers.routes");
let imagesRouter = require("./routes/images.routes");


let app = express();
let port = process.env.PORT || "3000";

let connectDB = require("./database/connect.db");

const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(logger("dev"));
app.use(express.json());
app.use(cors({}));

app.use("/", indexRouter);
app.use("/api/customers", upload.none(), customersRouter);
app.use("/api/designers", upload.none(), designerRouter);
app.use("/api/products", upload.none(), productRouter);
app.use("/api/orders", upload.none(), orderRouter)
app.use("/api/images", imagesRouter);


app.listen(port, () => {
  console.log("Server is listening on PORT:", port);
  console.log(`click http://localhost:${port}`);
  connectDB();
});

module.exports = app;
