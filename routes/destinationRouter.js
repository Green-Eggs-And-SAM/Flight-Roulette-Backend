const express = require("express");
const router = express.Router();
const fs = require("fs");
const destinations = require("../data/destinations.json");

router.get("/", (req, res) => {
    res.json(destinations);
});

router.get("/names-flags-list", (req, res) => {
    try {
        const dataArr = JSON.parse(fs.readFileSync("./data/destinations.json"));

        let objs = [];
        for (let i = 0; i < dataArr.length; i++) {
            const obj = {};
            obj.name = dataArr[i].name;
            obj.flag = dataArr[i].flag;
            obj.points = dataArr[i].points;
            objs.push(obj);
        }
        res.status(200).json(objs);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error getting all names and flags");
    }
});

router.get("/:name", (req, res) => {
    try {
        const foundDestination = destinations.find(
            (item) =>
                item.name.toLowerCase() === req.params.name.toLocaleLowerCase()
        );
        console.log(foundDestination);
        let obj = {};
        obj.name = foundDestination.name;
        obj.flag = foundDestination.flag;
        obj.landscape = foundDestination.landscape;

        res.status(200).json(obj);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error getting named country");
    }
});

router.get("/:name/video", (req, res) => {
    try {
        const foundDestination = destinations.find(
            (item) =>
                item.name.toLowerCase() === req.params.name.toLocaleLowerCase()
        );
        res.status(200).json(foundDestination.video);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error getting video");
    }
});

router.put("/add-points", (req, res) => {
    try {
        const path = "data/destinations.json";
        const countries = JSON.parse(fs.readFileSync(path));
        // console.log("countries", countries);
        for (let i = 0; i < req.body.length; i++) {
            const foundDestination = countries.find(
                (item) =>
                    item.name.toLowerCase() ===
                    req.body[i].name.toLocaleLowerCase()
            );

            foundDestination.points =
                parseInt(foundDestination.points) +
                parseInt(req.body[i].newPoint);
        }
        console.log("countries", countries);

        fs.writeFile(path, JSON.stringify(countries), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return res.status(500).json({ error: "Error updating JSON " });
            }
            console.log("Data has been written to", path);
            res.status(200).json("Points added");
        });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error getting video");
    }
});

module.exports = router;
