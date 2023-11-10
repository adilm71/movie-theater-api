const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Show, User } = require("../models/index");
const { Sequelize } = require("sequelize");
const showRouter = Router();
const userRouter = Router();
showRouter.get("/", async (req, res) => {
  try {
    const findShow = await Show.findAll();
    res.json(findShow);
  } catch (error) {
    res.status(500).send({ error: "There is an error during GET request" });
  }
});

showRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findShow = await Show.findByPk(id);
    res.json(findShow);
  } catch (error) {
    res.status(500).send({ error: "There is an error during GET ID request" });
  }
});

showRouter.get("/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const findShow = await Show.findAll({ where: { genre: genre } });
    res.json(findShow);
  } catch (error) {
    res
      .status(500)
      .send({ error: "There is an error during GET Genre request" });
  }
});

showRouter.post("/", async (req, res) => {
  try {
    const postShow = await Show.create(req.body);
    const findShow = await Show.findAll();
    res.json(findShow);
  } catch (error) {
    res.status(500).send({ error: "There is an error during POST request" });
  }
});
showRouter.put(
  "/:id",
  [
    check("available", "Availability cant be empty field")
      .not()
      .isEmpty()
      .trim(),
    check("available", "Characters has to be between 5-25").isLength({
      min: 5,
      max: 25,
    }),
    check("rating", "Rating cant be empty field").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        const id = req.params.id;
        const updateShow = await Show.update(req.body, { where: { id: id } });
        const findShow = await Show.findAll();
        res.json(findShow);
      } catch (error) {
        res.status(500).send({ error: "There is an error during PUT request" });
      }
    }
  }
);

showRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteShow = await Show.destroy({ where: { id: id } });
    const findShow = await Show.findAll();
    res.json(findShow);
  } catch (error) {
    res.status(500).send({ error: "There is an error during DELETE request" });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error  during GET request" });
  }
});
userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findByPk(id, {
      include: [
        {
          model: Show,
          through: "watched",
        },
      ],
    });
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error  during GET ID request" });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const postUser = await User.create(req.body);
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error  during POST request" });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.update(req.body, { where: { id: id } });
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error during PUT request" });
  }
});

userRouter.put("/:id/shows/:sid", async (req, res) => {
  try {
    const id = req.params.id;
    const sid = req.params.sid;
    const updateUser = await User.findByPk(id);
    const findShow = await Show.findByPk(sid);
    const watchShow = await updateUser.addShow(findShow);
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error during PUT request" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.destroy({ where: { id: id } });
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    res.status(500).send({ error: "There is an error during DELETE request" });
  }
});

module.exports = {
  showRouter,
  userRouter,
};
