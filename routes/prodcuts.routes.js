var express = require("express");
var router = express.Router();
const db = require("../src/models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const response = await db.products.findAll({
      ...req.body,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/get", async (req, res, next) => {
  try {
    const response = await db.products.findAll({
      attributes: req.body.attributes,
      where: {
        soft_delete: {
          [Op.is]: null,
        },
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/:product_id", async (req, res, next) => {
  try {
    const response = await db.products.findByPk(req.params.product_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await db.products.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/:product_id", async (req, res, next) => {
  try {
    const response = await db.products.destroy({
      where: {
        product_id: req.params.product_id,
      },
    });
    res.status(200).send({ totalDeleted: response });
  } catch (error) {
    res.status(400).send({ error: error.original });
  }
});

router.patch("/", async (req, res, next) => {
  const alllowedUpdates = [
    "product_name",
    "category_id",
    "note",
    "price",
    "soft_delete",
  ];
  const updates = Object.keys(req.body.updates);
  const isvalidOrNot = updates.every((update) =>
    alllowedUpdates.includes(update)
  );

  if (!isvalidOrNot)
    return res
      .status(400)
      .send({ error: { sqlMessage: "Invalid Operation", errno: 4000 } });

  try {
    const response = await db.products.update(req.body.updates, {
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
