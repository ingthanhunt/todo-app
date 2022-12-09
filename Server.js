const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/ToDoRoute");

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());

app.use(routes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error(err))

app.listen(PORT, () => console.log("Server running on port " + PORT));