const express = require("express");
const db = require("../../db/login");
const { deCipherObject } = require("../../encryption");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const decifBody = { ...req.body, password: deCipherObject(req.body.password) };
    // console.log(decifBody);
    let results = await db.checkLogin(decifBody);
    if (results && results[0]) {
      res.json(results[0]);
    } else {
      res.status(401);
      res.json({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

router.get("/logout/:userid", async (req, res) => {
  try {
    let results = await db.logoutUser(req.params.userid);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Something went wrong.",
    });
    res.sendStatus(500);
  }
});

module.exports = router;
