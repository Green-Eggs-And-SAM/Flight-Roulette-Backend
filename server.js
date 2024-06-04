const express = require("express");
const cors = require("cors"); // import cors for cross origin resource sharing
const app = express();
const destinationRoutes = require("./routes/destinationRouter.js");

const port = 5050;

app.use(cors());

app.use((req, res, next) => {
    console.log(`log incoming request ${req.path} time: ${Date.now()}`);
    // res.send("app under maintenance");
    next();
});

app.use(express.json());

app.use(express.static("public"));

app.use("/destinations", destinationRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});
