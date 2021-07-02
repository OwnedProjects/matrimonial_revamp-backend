const express = require("express");
const db = require("../../db/registration");
const router = express.Router();

router.get("/:unm", async (req, res) => {
  try {
    let results = await db.checkUsernameAvailable(req.params.unm);
    res.json(results[0]);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

router.post("/register", async (req, res) => {
  try {
    let results = await db.registerUser(req.body);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Missing some fields.",
    });
    res.sendStatus(400);
  }
});

router.post("/update", async (req, res) => {
  try {
    let results = await db.updateUserDetails(req.body);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json({
      message: "Missing some fields.",
    });
    // res.sendStatus(400);
  }
});

module.exports = router;
