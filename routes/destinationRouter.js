const express = require("express");
const router = express.Router();
const fs = require("fs");
const destinations = require("../data/destinations.json");

router.get("/", (req, res) => {
    res.json(destinations);
});

router.get("/names", (req, res) => {
    const dataArr = JSON.parse(fs.readFileSync("./data/destinations.json"));
    const arr = dataArr.map((destination) => destination.name);
    res.json(JSON.stringify(arr));
});

router.get("/:name", (req, res) => {
    const foundDestination = destinations.find(
        (item) =>
            item.name.toLowerCase() === req.params.name.toLocaleLowerCase()
    );
    console.log(foundDestination);
    // you could include an if statement to check if the foundImage is undefined
    // if the foundImage is undefined use res.json or res.send to send back an error message
    res.json(foundDestination);
});

module.exports = router;
