const pool = require("../../connection");
const { cipherObject } = require("../../encryption");
const userdb = {};

userdb.getAllActiveUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `userid`, `firstnm`, `middlenm`, `lastnm`, `contactno`, `alternatecontactno`, `emailid`, `guardiannm`, `guardianrel`, `mothernm`, `guardianoccupation`, `mothersoccupation`, `maritalstatus`, `dob`, `age`, `gender`, `height`, `complexion`, `residence`, `nativeplace`, `subcaste`, `education`, `institute`, `additionaleducation`, `employer`, `designation`, `totalexp`, `salary`, `aboutme`, `expectations`, `photo1`, `photo2`, `photo3`, `photo4`, `loginid` FROM `user_master` WHERE `role`=? AND `status`=?",
      ["user", "active"],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

userdb.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `userid`, `firstnm`, `middlenm`, `lastnm`, `contactno`, `alternatecontactno`, `emailid`, `guardiannm`, `guardianrel`, `mothernm`, `guardianoccupation`, `mothersoccupation`, `maritalstatus`, `dob`, `gender`, `age`, `height`, `complexion`, `residence`, `nativeplace`, `subcaste`, `education`, `institute`, `additionaleducation`, `employer`, `designation`, `totalexp`, `salary`, `aboutme`, `expectations`, `photo1`, `photo2`, `photo3`, `photo4`, `loginid` , `password` FROM `user_master` WHERE `role`=? AND NOT `status`='deactive'",
      "user",
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log(result);

        if (result) {
          result.map((user) => {
            user.password = cipherObject(user.password);
          });
        }
        return resolve(result);
      }
    );
  });
};

userdb.getUsersDetails = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `userid`, `firstnm`, `middlenm`, `lastnm`, `contactno`, `alternatecontactno`, `emailid`, `guardiannm`, `guardianrel`, `mothernm`, `guardianoccupation`, `mothersoccupation`, `maritalstatus`, `dob`, `gender`, `age`, `height`, `complexion`, `residence`, `nativeplace`, `subcaste`, `education`, `institute`, `additionaleducation`, `employer`, `designation`, `totalexp`, `salary`, `aboutme`, `expectations`, `photo1`, `photo2`, `photo3`, `photo4`, `loginid` FROM `user_master` WHERE `role`=? AND userid=? AND NOT `status`='deactive'",
      ["user", userid],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

userdb.generateCreds = (userid, firstnm) => {
  return new Promise((resolve, reject) => {
    const passcode = randomString(5, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const password = `${firstnm.substr(0, 3)}${passcode}`;
    // resolve(password);
    pool.query("UPDATE `user_master` SET `password`=? WHERE `userid`=?", [password, userid], (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve({ userid: userid, firstnm: firstnm, password: cipherObject(password) });
    });
  });
};

userdb.uploadPhoto = (userid, filename, photono) => {
  return new Promise((resolve, reject) => {
    // resolve(password);
    console.log("Photo No:", photono);
    pool.query(`UPDATE user_master SET photo${photono}=? WHERE userid=?`, [filename, userid], (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve({ userid: userid, photo: filename });
    });
  });
};

userdb.fetchProfiles = (gender, noofdisp, pageno) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `userid`, `firstnm`, `middlenm`, `lastnm`, `contactno`, `alternatecontactno`, `emailid`, `guardiannm`, `guardianrel`, `mothernm`, `guardianoccupation`, `mothersoccupation`, `maritalstatus`, `dob`, `age`, `gender`, `height`, `complexion`, `residence`, `nativeplace`, `subcaste`, `education`, `institute`, `additionaleducation`, `employer`, `designation`, `totalexp`, `salary`, `aboutme`, `expectations`, `photo1`, `photo2`, `photo3`, `photo4` FROM `user_master` WHERE `role`=? AND NOT `gender`=?",
      ["user", gender],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

const randomString = (length, chars) => {
  let result = "";
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
module.exports = userdb;
