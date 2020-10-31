var express = require("express");
var router = express.Router();
const db = require("../src/models");
const { Op } = require("sequelize");

// const User = require("../src/models/user");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const response = await db.orders.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/get", async (req, res, next) => {
  try {
    const response = await db.orders.findAll({
      ...req.body,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/ordersOr", async (req, res, next) => {
  try {
    const response = await db.orders.findAll({
      where: {
        [Op.or]: req.body,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error: error });
  }
});

router.get("/:order_id", async (req, res, next) => {
  try {
    const response = await db.orders.findByPk(req.params.order_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await db.orders.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.original);
  }
});

router.delete("/:order_id", async (req, res, next) => {
  try {
    const response = await db.orders.destroy({
      where: {
        order_id: req.params.order_id,
      },
    });
    res.status(200).send({ totalDeleted: response });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/", async (req, res, next) => {
  const alllowedUpdates = [
    "product_id",
    "customer_id",
    "guarantor_one_id",
    "guarantor_two_id",
    "guarantor_three_id",
    "total_installments",
    "amount_item",
    "quantity",
    "discount",
    "total",
    "downpayment",
    "date_of_entry",
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
    const response = await db.orders.update(req.body.updates, {
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
