const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookeParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const notFoundMiddleware = require("./middlewares/notFound.middleware.js");
const cookieParser = require("cookie-parser")


const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;