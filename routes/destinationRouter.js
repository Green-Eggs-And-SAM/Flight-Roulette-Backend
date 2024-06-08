const express = require("express");
const router = express.Router();
const fs = require("fs");
const destinations = require("../data/destinations.json");

router.get("/", (req, res) => {
    res.json(destinations);
});

router.get("/names-flags-list", (req, res) => {
    const dataArr = JSON.parse(fs.readFileSync("./data/destinations.json"));

    const names = dataArr.map((destination) => destination.name);
    const flags = dataArr.map((destination) => destination.flag);

    let objs = [];
    for (let i = 0; i < names.length; i++) {
        const obj = {};
        obj.name = names[i];
        obj.flag = flags[i];
        objs.push(obj);
    }
    console.log(objs);
    res.json(objs);
});

router.get("/:name", (req, res) => {
    const foundDestination = destinations.find(
        (item) =>
            item.name.toLowerCase() === req.params.name.toLocaleLowerCase()
    );
    console.log(foundDestination);
    let obj = {};
    obj.name = foundDestination.name;
    obj.flag = foundDestination.flag;
    obj.landscape = foundDestination.landscape;

    res.json(obj);
});

router.get("/:name/video", (req, res) => {
    const foundDestination = destinations.find(
        (item) =>
            item.name.toLowerCase() === req.params.name.toLocaleLowerCase()
    );
    console.log(foundDestination.video);
    res.json(foundDestination.video);
});

module.exports = router;
