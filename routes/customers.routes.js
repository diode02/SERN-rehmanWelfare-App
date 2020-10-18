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
    res.status(400).send({ error });
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
    // console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
