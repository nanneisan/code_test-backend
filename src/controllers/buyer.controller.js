const db = require("../models");
const Buyer = db.buyer;

// Create new Buyer to the database.
exports.create = async (body) => {
  if (!body.name && !body.phone_no) {
    return "Buyer info can not be empty!";
  }

  const exist_buyer = await Buyer.findOne({
    where: { name: body.name, phone_no: body.phone_no },
  });

  if (exist_buyer) {
    return exist_buyer.id;
  } else {
    // Save Buyer in the database
    const buyer = await Buyer.create(body);
    return buyer.id || null;
  }
};
