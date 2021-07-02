var SimpleCrypto = require("simple-crypto-js").default;
const secretKey = "matr$m0ni@l";
const simpleCrypto = new SimpleCrypto(secretKey);
const crypto = {};

crypto.cipherObject = (obj) => {
  return simpleCrypto.encrypt(obj);
};

crypto.deCipherObject = (obj) => {
  return simpleCrypto.decrypt(obj);
};

module.exports = crypto;
