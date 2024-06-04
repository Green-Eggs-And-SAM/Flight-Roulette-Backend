const express = require("express");
const router = express.Router();
const destinations = require("../data/destinations.json");

router.get("/", (req, res) => {
    res.json(destinations);
});

router.get("/names", (req, res) => {
    const dataArr = JSON.parse(destinations);
    const arr = dataArr.map((destination) => destination.name);
    console.log(arr);
    res.json(images);
});

router.get("/:name", (req, res) => {
    const foundDestination = destinations.find(
        (item) => item.name === req.params.name
    );
    // you could include an if statement to check if the foundImage is undefined
    // if the foundImage is undefined use res.json or res.send to send back an error message
    res.json(foundDestination);
});
