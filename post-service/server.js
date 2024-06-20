const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const rootRouter = require("./routes");
const errorMiddleware = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5004;

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
