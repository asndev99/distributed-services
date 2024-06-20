const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();
const api = require("./routes/index");

app.use(express.json());
app.use(cors());

app.use("/api", api);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
