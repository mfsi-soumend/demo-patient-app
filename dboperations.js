const config = require("./dbconfig");
const mysql = require("mysql");

const pool = mysql.createPool(config);

async function addPatientData(Patient) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      const sqlQuery =
        "INSERT INTO patient (given_name, middle_name, family_name, birthdate, birthdate_estimated, gender, preferred, address1, city_village, state_province, country, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      connection.query(
        sqlQuery,
        [
          Patient.givenName,
          Patient.middleName,
          Patient.familyName,
          new Date(Patient.birthdate),
          Patient.birthdateEstimated,
          Patient.gender,
          Patient.preferred,
          Patient.address1,
          Patient.cityVillage,
          Patient.stateProvince,
          Patient.country,
          Patient.postalCode,
          Patient.phone,
        ],
        (error, results, fields) => {
          connection.release();

          if (error) {
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        }
      );
    });
  });
}

exports.addPatientData = addPatientData;
