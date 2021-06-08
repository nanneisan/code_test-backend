const db = require("../models");
const sequelize = db.sequelize;
const PurchaseHistory = db.purchase_history;
const EvoucherBuyer = db.evoucher_buyer;

const QRCode = require("qrcode");
const { PassThrough } = require("stream");
const moment = require("moment");

//commonfun
const commonfun = require("../utils/commonfun");

// Retrieve all History from the database.
exports.getHistory = async (req, res) => {
  try {
    const evoucher_id = req.query.evoucher_id || "";
    let where = "";

    if (evoucher_id) {
      where += `where ev.id=${evoucher_id}`;
    }
    const query = `select ev.id as evoucher_id,ev.title, ev.evoucher_code, ev.description, buyer.name, buyer.phone_no,history.promo_code, history.createdAt as date, ev_buy.evoucher_limit, ev_buy.used_count from evoucher_ms.purchase_history as history
    inner join evoucher_ms.evoucher_buyer as ev_buy
      inner join evoucher_ms.buyer as buyer on buyer.id = ev_buy.buyer_id
      inner join evoucher_ms.evoucher as ev on ev.id = ev_buy.evoucher_id
      ${where}`;

    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    commonfun.generatePromoCode();
    res.status(200).send({ data: data });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving purchase history.",
    });
  }
};

// Checkout Evoucher
exports.checkout = async (req, res) => {
  try {
    const date = moment().format("YYYY-MM-DD");
    const { phone_no, evoucher_code, amount } = req.body;
    const query = `select ev_buy.id, ev_buy.code, ev_buy.used_count, ev_buy.used_amount from evoucher_ms.evoucher_buyer as ev_buy
    inner join evoucher_ms.buyer as buyer on buyer.id = ev_buy.buyer_id
    inner join evoucher_ms.evoucher as ev on ev.id = ev_buy.evoucher_id
    where ev.evoucher_code = '${evoucher_code}' and buyer.phone_no like '${phone_no}' and ev_buy.evoucher_limit >= ev_buy.used_count and ev.expiry_date > ${date} and ev.amount > ${amount};`;

    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (data.length > 0) {
      const obj = data[0];
      const count = Number(obj.used_count || 0) + 1;
      const used_amount = Number(obj.used_amount || 0) + amount;
      const promo_code = commonfun.generatePromoCode();
      const create_history = await PurchaseHistory.create({
        evoucher_buyer_id: obj.id,
        promo_code: promo_code,
        amount: amount,
      });
      if (create_history) {
        EvoucherBuyer.update(
          { used_count: count, used_amount: used_amount },
          {
            where: { id: obj.id },
          }
        );
      }
      const content = obj.code;
      const qrStream = new PassThrough();
      const result = await QRCode.toFileStream(qrStream, content, {
        type: "png",
        width: 200,
        errorCorrectionLevel: "H",
      });
      qrStream.pipe(res);
    } else res.status(200).send({ message: "Evoucher code is not worked." });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving purchase history.",
    });
  }
};
