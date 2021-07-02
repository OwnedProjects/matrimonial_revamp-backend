const pool = require("../../connection");
const userdb = {};

userdb.checkLogin = (loginObj) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT `userid`,`firstnm`,`role`,`status`,`isregistered`,`gender` FROM `user_master` WHERE `loginid`=? AND `password`=?", [loginObj.loginid, loginObj.password], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result && result[0]) {
        pool.query("UPDATE `user_master` SET `status`='active' WHERE `userid`=?", result[0].userid, (errupd, resupd) => {
          if (errupd) {
            return reject(errupd);
          }
          if (resupd) return resolve(result);
        });
      } else {
        return resolve(result);
      }
    });
  });
};

userdb.logoutUser = (userid) => {
  return new Promise((resolve, reject) => {
    console.log(userid);
    pool.query("UPDATE `user_master` SET `status`='inactive' WHERE `userid`=?", userid, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = userdb;
