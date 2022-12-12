require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.jsx");
const userRoutes = require("./routes/user.route.jsx");
const todosRoutes = require("./routes/todos.route.jsx");
const bodyParser = require("body-parser");
const requiresAuth = require("./middleware/auth.middleware.jsx");
// express app
const app = express();
//middleware
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PATCH",
    "PUT",
    "DELETE",
    "OPTION"
  );
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todos", todosRoutes);

// App port
const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server running on port ${port}`));

// Db connection
const url = process.env.DB_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  })
  .then(() => console.log("Db connected"))
  .catch((error) => console.log("Db connection failed", error.message));
