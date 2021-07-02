const pool = require("../../connection");
const userdb = {};

userdb.registerUser = (userobj) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'matrimonial' AND TABLE_NAME = 'user_master'", (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result && result[0]) {
        // console.log(result[0]["AUTO_INCREMENT"]);
        console.log(userobj);
        const { firstnm, middlenm, lastnm, contactno, alternatecontactno, emailid, guardiannm, guardianrel, mothernm, guardianoccupation, mothersoccupation, maritalstatus, dob, gender, age, height, complexion, residence, nativeplace, subcaste, education, institute, additionaleducation, employer, designation, totalexp, salary, aboutme, expectations } = userobj;
        pool.query(
          "INSERT INTO `user_master`(`firstnm`, `middlenm`, `lastnm`, `contactno`, `alternatecontactno`, `emailid`, `guardiannm`, `guardianrel`, `mothernm`, `guardianoccupation`, `mothersoccupation`, `maritalstatus`, `dob`, `gender`, `age`, `height`, `complexion`, `residence`, `nativeplace`, `subcaste`, `education`, `institute`, `additionaleducation`, `employer`, `designation`, `totalexp`, `salary`, `aboutme`, `expectations`, `loginid`, `password`, `role`, `status`, `isregistered`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [firstnm, middlenm, lastnm, contactno, alternatecontactno, emailid, guardiannm, guardianrel, mothernm, guardianoccupation, mothersoccupation, maritalstatus, dob, gender, age, height, complexion, residence, nativeplace, subcaste, education, institute, additionaleducation, employer, designation, totalexp, salary, aboutme, expectations, `${firstnm}${result[0]["AUTO_INCREMENT"]}`, "", "user", "inactive", "yes"],
          (err, result) => {
            if (err) {
              return reject(err);
            }

            return resolve(result);
          }
        );
      }
    });
  });
};

userdb.checkUsernameAvailable = (unm) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM `user_master` WHERE `username`=?", unm, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

userdb.updateUserDetails = (userobj) => {
  return new Promise((resolve, reject) => {
    // 29
    pool.query(
      "UPDATE `user_master` SET `firstnm`=?,`middlenm`=?,`lastnm`=?,`contactno`=?,`alternatecontactno`=?,`emailid`=?,`guardiannm`=?,`guardianrel`=?,`mothernm`=?,`guardianoccupation`=?,`mothersoccupation`=?,`maritalstatus`=?,`dob`=?,`gender`=?,`age`=?,`height`=?,`complexion`=?,`residence`=?,`nativeplace`=?,`subcaste`=?,`education`=?,`institute`=?,`additionaleducation`=?,`employer`=?,`designation`=?,`totalexp`=?,`salary`=?,`aboutme`=?,`expectations`=?,`isregistered`='yes' WHERE `userid`=?",
      [
        userobj.firstnm,
        userobj.middlenm,
        userobj.lastnm,
        userobj.contactno,
        userobj.alternatecontactno,
        userobj.emailid,
        userobj.guardiannm,
        userobj.guardianrel,
        userobj.mothernm,
        userobj.guardianoccupation,
        userobj.mothersoccupation,
        userobj.maritalstatus,
        userobj.dob,
        userobj.gender,
        userobj.age,
        userobj.height,
        userobj.complexion,
        userobj.residence,
        userobj.nativeplace,
        userobj.subcaste,
        userobj.education,
        userobj.institute,
        userobj.additionaleducation,
        userobj.employer,
        userobj.designation,
        userobj.totalexp,
        userobj.salary,
        userobj.aboutme,
        userobj.expectations,
        userobj.userid,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

module.exports = userdb;
