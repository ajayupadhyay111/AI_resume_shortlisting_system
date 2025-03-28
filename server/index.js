const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resume.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

const app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173",process.env.FrontendURL],
    credentials: true,
  })
);
app.use(cookieParser());


// User Routes
app.use("/api/user", userRoutes);

// Resume Routes
app.use("/api/resume", resumeRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
);
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
