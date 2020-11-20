var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();
const db = require("../src/models");
const multer = require("multer");
const fs = require("fs");
const formidable = require("formidable");
var path = require("path");
var base64Img = require("base64-img");

// var upload = multer({ dest: "uploads/" });

// const User = require("../src/models/user");
/* GET users listing. */

router.get("/", async (req, res, next) => {
  try {
    const response = await db.customers.findAll({
      where: {
        ...req.body,
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

router.post("/ff", async (req, res, next) => {
  try {
    const response = await db.customers.findAll({
      where: {
        ...req.body,
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
    const response = await db.customers.create({
      ...req.body,
      photo: imageData,
    });
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
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
    // if (`../assests/profile/${req.params.customer_id}.jpg`)
    //   fs.unlinkSync(`../assests/profile/${req.params.customer_id}.jpg`);

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

// router.post(
//   "/avatar",
//   upload.single("upload"),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer)
//       .resize({
//         width: 250,
//         height: 250,
//       })
//       .png()
//       .toBuffer();
//     try {
//       console.log(req.body.customer_id);
//       const response = await db.customers.update(
//         { photo: buffer },
//         {
//           where: {
//             customer_id: req.body.customer_id,
//           },
//         }
//       );
//       res.send(response);
//     } catch (error) {
//       res.status(500).send({ error: error.original });
//     }
//   },
//   (error, req, res, next) => {
//     console.log(error);
//     res.status(400).send({ error: error.message });
//   }
// );

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/profile");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.customer_id + ".jpg");
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error("Please upload jpg or jpeg or png file formate only")
      );
    cb(undefined, true);
  },
}).single("photo");

router.post("/avatar", async (req, res, next) => {
  // capture the encoded form data
  // const form = formidable({ multiples: true });
  // let response;
  // form.parse(req, async (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   req.body = { ...fields };

  //   try {
  //     response = await db.customers.create({
  //       ...req.body,
  //       photoPath:
  //         path.join(__dirname, "../") +
  //         "assests/profile/" +
  //         req.body.customer_id +
  //         ".jpg",
  //     });
  // if (fields.photo) {
  //   console.log(fields.photo);
  //   console.log("base code run");
  //   base64Img.imgSync(
  //     fields.photo,
  //     "./assests/profile/",
  //     fields.customer_id
  //   );
  //     } else {
  //       await upload(req, res, async function (err) {
  //         if (err instanceof multer.MulterError) {
  //           return res.status(500).json(err);
  //         } else if (err) {
  //           return res.status(500).json(err);
  //         }
  // return res.status(201).send(response);
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ error: error.original });
  //   }
  // });

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.body = { ...fields };

    try {
      response = await db.customers.create({
        ...req.body,
        photoPath:
          path.join(__dirname, "../") +
          "assests/profile/" +
          req.body.customer_id +
          ".jpg",
      });
      if (fields.photo && fields.photo.toString()[0] == "d") {
        base64Img.imgSync(
          fields.photo,
          "./assests/profile/",
          fields.customer_id
        );
        return res.status(201).send(response);
      } else {
        return res.status(201).send(response);
      }
    } catch (error) {
      return res.status(500).send({ error: error.original });
    }
  });

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
  });
});

router.delete("/avatar", async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send();
});

router.get("/avatar/:customer_id", async (req, res, next) => {
  try {
    console.log("backend");
    const response = await db.customers.findByPk(req.params.customer_id);
    // if (!response || !response.photoPath) throw new Error();
    // read binary data
    var data = base64Img.base64Sync(response.photoPath);

    res.set("Content-Type", "image/png");
    // var filepath = response.photoPath;
    res.send(data);
    // res.send(response.photoPath);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
