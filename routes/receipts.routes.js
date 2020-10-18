var express = require("express");
var router = express.Router();
const db = require("../src/models");

router.get("/", async (req, res, next) => {
  try {
    const response = await db.receipts.findAll({
      where: {
        ...req.body,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/attributes", async (req, res, next) => {
  try {
    const response = await db.receipts.findAll({
      where: {
        ...req.body.where,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/:receipts_id", async (req, res, next) => {
  try {
    const response = await db.receipts.findByPk(req.params.receipts_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send({ error });
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const response = await db.receipts.create(req.body);
//     res.status(201).send(response);
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// });

// router.delete("/:receipts_id", async (req, res, next) => {
//   try {
//     const response = await db.receipts.destroy({
//       where: {
//         receipts_id: req.params.receipts_id,
//       },
//     });
//     res.status(200).send({ totalDeleted: response });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.patch("/", async (req, res, next) => {
//   const alllowedUpdates = ["product_name", "category_id", "price"];
//   const updates = Object.keys(req.body.updates);
//   console.log(updates);
//   const isvalidOrNot = updates.every((update) =>
//     alllowedUpdates.includes(update)
//   );

//   if (!isvalidOrNot)
//     return res.status(400).send({ error: "Invalid Operation" });

//   try {
//     const response = await db.receipts.update(req.body.updates, {
//       where: {
//         ...req.body.where,
//       },
//     });
//     res.send(response);
//   } catch (error) {
//     res.status(500).send(error + "");
//   }
// });

module.exports = router;
