var express = require("express");
var router = express.Router();
const db = require("../src/models");

// const User = require("../src/models/user");
/* GET users listing. */
router.get("/:category_id", async (req, res, next) => {
  try {
    const response = await db.categories.findByPk(req.params.category_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await db.categories.findAll({
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
    const response = await db.categories.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/:category_id", async (req, res, next) => {
  try {
    const response = await db.categories.destroy({
      where: {
        category_id: req.params.category_id,
      },
    });
    res.status(200).send({ totalDeleted: response });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
