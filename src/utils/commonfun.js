const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

exports.generatePromoCode = () => {
  let text = Math.floor(Math.random() * 10);

  for (var i = 0; i < 5; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
    text += Math.floor(Math.random() * 10);
  }
  return text;
};

exports.generateRandomId = function () {
  let now = new Date();
  let text = now.getTime();
  text += Math.floor(Math.random() * 9000);
  return text;
};

exports.generateRamdonCode = function () {
  let text = Math.floor(Math.random() * 9000);

  for (var i = 0; i < 5; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
    text += Math.floor(Math.random() * 10);
  }
  return text;
};
