const express = require("express");
const db = require("../../db/users");
const router = express.Router();
const fileupload = require("express-fileupload");

// Get all Active users except admin
router.get("/active", async (req, res) => {
  try {
    let results = await db.getAllActiveUsers();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

// Get All Users except admin
router.get("/", async (req, res) => {
  try {
    let results = await db.getAllUsers();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

// Get Users details
router.get("/:userid", async (req, res) => {
  try {
    let results = await db.getUsersDetails(req.params.userid);
    res.json(results[0]);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

// Get All Users except admin
router.get("/generateCreds/:userid/:firstnm", async (req, res) => {
  try {
    let results = await db.generateCreds(req.params.userid, req.params.firstnm);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});

// Upload User Photo
router.post("/uploadPhoto/:userid", async (req, res) => {
  try {
    const newpath = `files/`;
    const file = req.files.file;
    const dt = new Date().getTime();
    const filename = `${dt}${file.name}`;
    const photono = req.body.photono;
    let results = await db.uploadPhoto(req.params.userid, filename, photono);

    console.log(`${newpath} - ${filename} - ${photono}`);

    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "File upload failed", code: 500 });
      } else {
        res.status(200).send({ message: "File Uploaded", code: 200 });
      }
    });
    //res.json(results);
  } catch (err) {
    console.log("Error -", err);
    res.status(400);
    res.json({
      message: err,
    });
    // res.sendStatus(400);
  }
});

// Fetch matching profiles
router.get("/fetchProfiles/:gender/:noofdisp/:pageno", async (req, res) => {
  try {
    let results = await db.fetchProfiles(req.params.gender, req.params.noofdisp, req.params.pageno);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
    res.sendStatus(400);
  }
});
module.exports = router;
