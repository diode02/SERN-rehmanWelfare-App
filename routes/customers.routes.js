var express = require("express");
var router = express.Router();
const db = require("../src/models");

// const User = require("../src/models/user");
/* GET users listing. */

router.get("/", async (req, res, next) => {
  try {
    const response = await db.customers.findAll({
      where: {
        ...req.body,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/att/", async (req, res, next) => {
  try {
    const response = await db.customers.findAll({
      where: {
        ...req.body.where,
      },
      attributes: [...req.body.attributes],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/:customer_id", async (req, res, next) => {
  try {
    const response = await db.customers.findByPk(req.params.customer_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await db.customers.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.original);
  }
});

router.delete("/:customer_id", async (req, res, next) => {
  try {
    const response = await db.customers.destroy({
      where: {
        customer_id: req.params.customer_id,
      },
    });
    res.status(200).send({ totalDeleted: response });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/", async (req, res, next) => {
  const alllowedUpdates = [
    "customer_id",
    "first_name",
    "last_name",
    "mobile_number",
    "home_other_number",
    "address",
    "city",
    "note",
  ];
  const updates = Object.keys(req.body.updates);
  const isvalidOrNot = updates.every((update) =>
    alllowedUpdates.includes(update)
  );

  if (!isvalidOrNot)
    return res
      .status(400)
      .send({ error: { sqlMessage: "Invalid Operation", errno: 4000 } });
  console.log(req.body.updates);
  try {
    const response = await db.customers.update(req.body.updates, {
      where: {
        ...req.body.where,
      },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.original });
  }
});

module.exports = router;
