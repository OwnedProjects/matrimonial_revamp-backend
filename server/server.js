const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const port = process.env.port | 3001;
const app = express();

const regRouter = require("./routes/registration");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/users");

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(express.json());
app.use("/api/register", regRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
