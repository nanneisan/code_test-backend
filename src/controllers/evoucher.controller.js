const db = require("../models");
const sequelize = db.sequelize;
const Evoucher = db.evoucher;

//controllers
const BuyerController = require("./buyer.controller");
const EvoucherBuyer = require("./evoucher_buery.controller");

//common fun
const commonfun = require("../utils/commonfun");

// Create and Save a new Evoucher
exports.create = (req, res) => {
  // Create a Evoucher
  const body = req.body;
  const prefix = "EVC";
  const ev_prefix = "EVBY";

  // Validate request
  if (!body.title && body.amount <= 0) {
    res.status(400).send({
      message: "Evoucher can not be empty!",
    });
    return;
  }
  const buyers =
    typeof body.buyers == "string" ? JSON.parse(body.buyers) : body.buyers;
  if (body.buyers) {
    body.evoucher_code = prefix + commonfun.generateRandomId();

    // Save Evoucher in the database
    Evoucher.create(body)
      .then((data) => {
        const ev_id = data.id;

        buyers.map(async (one) => {
          const buyerid = await BuyerController.create(one);
          const code = ev_prefix + commonfun.generateRamdonCode();
          EvoucherBuyer.create({
            code: code,
            evoucher_id: ev_id,
            buyer_id: buyerid,
            evoucher_limit: one.evoucher_limit || 0,
            used_count: 0,
          });
        });
        res.status(201).send({ data });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Evoucher.",
        });
      });
  } else {
    res.status(500).send({
      message: "Buyer information is needed while creating the Evoucher.",
    });
  }
};

// Retrieve all Evouchers from the database.
exports.findAll = (req, res) => {
  Evoucher.findAll({ where: { is_deleted: 0, active: 1 } })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving evouchers.",
      });
    });
};

// Find a single Evoucher with an id
exports.findOne = async (req, res) => {
  const id = req.query.id;
  try {
    const evoucher = await Evoucher.findByPk(id);
    var query = `select buyer.name, buyer.phone_no, ev.evoucher_limit , ev.used_count from evoucher_buyer as ev
  inner join buyer as buyer on buyer.id = ev.buyer_id where evoucher_id = ${id}`;

    const detail = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    const data = { ...evoucher.dataValues, buyers: detail };
    res.status(200).send({ data: data });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving evoucher detail.",
    });
  }
};

// Update a Evoucher by the id in the request
exports.update = (req, res) => {
  const id = req.query.id;
  Evoucher.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Evoucher was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Evoucher with id=${id}. Maybe Evoucher was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Evoucher with id=" + id,
      });
    });
};

// Delete a Evoucher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.query.id;
  Evoucher.update(
    { is_deleted: 1 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Evoucher was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Evoucher with id=${id}.!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Evoucher with id=" + id,
      });
    });
};

// Change a Evoucher with status inactive
exports.inactive = (req, res) => {
  const id = req.query.id;
  Evoucher.update(
    { active: 0 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Evoucher was changed the status to inactive successfully.",
        });
      } else {
        res.send({
          message: `Cannot change the status of Evoucher with id=${id}.!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error changing the status of Evoucher with id=" + id,
      });
    });
};
