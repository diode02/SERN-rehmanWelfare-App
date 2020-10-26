var express = require("express");
var router = express.Router();
const db = require("../src/models");

// const User = require("../src/models/user");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const response = await db.installments_payments.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/get", async (req, res, next) => {
  try {
    const response = await db.installments_payments.findAll({
      ...req.body,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error.original);
  }
});

router.get("/:installments_payments_id", async (req, res, next) => {
  try {
    const response = await db.installments_payments.findByPk(
      req.params.installments_payments_id
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.patch("/", async (req, res, next) => {
  const alllowedUpdates = [
    "penality",
    "amount_received",
    "username_id",
    "note",
  ];
  const updates = Object.keys(req.body.updates);
  const isvalidOrNot = updates.every((update) =>
    alllowedUpdates.includes(update)
  );

  if (!isvalidOrNot)
    return res.status(400).send({ error: "Invalid Operation" });

  try {
    const response = await db.installments_payments.update(req.body.updates, {
      where: {
        ...req.body.where,
      },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send(error + "");
  }
});

module.exports = router;
