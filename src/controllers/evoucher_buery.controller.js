const db = require("../models");
const EvoucherBuyer = db.evoucher_buyer;

// Create new EvoucherBuyer to the database.
exports.create = async (body) => {
  if (!body.evoucher_id && !body.buery_id) {
    return "EvoucherBuyer info can not be empty!";
  }

  // Save EvoucherBuyer in the database
  const result = await EvoucherBuyer.create(body);
  return result.id || null;
};
