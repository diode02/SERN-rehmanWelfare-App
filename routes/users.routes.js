var express = require("express");
var router = express.Router();
const db = require("../src/models");
const { exec } = require("child_process");
const { DATE } = require("sequelize");

// const User = require("../src/models/user");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const response = await db.users.findByPk(req.body.username_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await db.users.findOne({
      where: {
        ...req.body,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.patch("/resetuser", async (req, res, next) => {
  try {
    let response = await db.users.update(req.body.updates, {
      where: {
        username_id: req.body.username_id,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/genBackup", async (req, res, next) => {
  try {
    exec(
      `sudo mysqldump -u root -pkhan01  rehman_liaqat_welfare > rehmanBackup${DATE.now()}.sql`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
        res.status(200).send(`stdout: ${stdout}`);
      }
    );
  } catch (error) {
    res.status(401).send({ error });
  }
});

// router.post("/secverify", async (req, res, next) => {
//   console.log("sec verify");
//   console.log(req.body);
//   try {
//     const response = await db.users.findOne({
//       where: {
//         ...req.body,
//       },
//     });
//     res.status(200).send(response);
//   } catch (error) {
//     res.status(401).send({ error });
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const response = await db.users.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const response = await db.users.destroy({
      where: {
        username_id: req.body.username_id,
      },
    });
    res.sendStatus(200).send(response);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});

router.patch("/updateuser", async (req, res, next) => {
  try {
    let response = await db.users.findOne({
      where: {
        username_id: req.body.username_id,
        password: req.body.data.current_password,
      },
    });
    if (!response) throw new Error("Invalid Password");
    response = await db.users.update(req.body.data, {
      where: { username_id: req.body.username_id },
    });

    if (req.body.data.username_id) {
      response = await db.users.findByPk(req.body.data.username_id);
      res.status(200).send(response);
    } else {
      response = await db.users.findByPk(req.body.username_id);
      res.status(200).send(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Invalid Password" });
  }

  // const alllowedUpdates = ["name", "email", "age", "password"];
  // let updates = Object.keys(req.body);
  // updates = updates.filter((update) => update != "current_password");
  // const isvalidOrNot = updates.every((update) =>
  //   alllowedUpdates.includes(update)
  // );

  // if (!isvalidOrNot)
  //   return res.status(400).send({ error: "Invalid Operation" });

  // try {
  //   //to force updating to follow our schema and not bypass our middleware we find and then change it here and then pass it from middele ware
  //   updates.forEach((update) => (req.user[update] = req.body[update]));
  //   const user = await req.user.save();
  //   const token = req.token;
  //   res.send({ user, token });
  // } catch (error) {
  //   res.status(500).send(error + "");
  // }
});

router.patch("/updateusersec", async (req, res, next) => {
  try {
    const response = await db.users.update(req.body.updates, {
      where: { ...req.body.where },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.original });
  }
});

module.exports = router;
