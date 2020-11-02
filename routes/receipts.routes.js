var express = require("express");
var router = express.Router();
const db = require("../src/models");
const { QueryTypes } = require("sequelize");
// const User = require("../src/models/user");
/* GET users listing. */

router.get("/ord/:id", async (req, res, next) => {
  try {
    const [results] = await db.sequelize.query(
      `call get_order_data(${req.params.id})`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
});

router.get("/ins/:id", async (req, res, next) => {
  try {
    const [results] = await db.sequelize.query(
      `call get_installment_data(${req.params.id})`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
});
module.exports = router;
