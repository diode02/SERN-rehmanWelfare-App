var express = require("express");
var router = express.Router();
const db = require("../src/models");

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

router.post("/", async (req, res, next) => {
  try {
    const response = await db.users.create(req.body);
    res.status(201).send(response);
  } catch (error) {
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

// router.patch("/", async (req, res, next) => {
//   const alllowedUpdates = ["username_id", "password"];
//   const updates = Object.keys(req.body);
//   const isvalidOrNot = updates.every((update) =>
//     alllowedUpdates.includes(update)
//   );

//   if (!isvalidOrNot)
//     return res.status(400).send({ error: "Invalid Operation" });

//   try {
//     //to force updating to follow our schema and not bypass our middleware we find and then change it here and then pass it from middele ware
//     updates.forEach((update) => (req.user[update] = req.body[update]));
//     req.user = await req.user.save();
//     res.send(req.user);
//   } catch (error) {
//     res.status(500).send(error + "");
//   }
// });

module.exports = router;
