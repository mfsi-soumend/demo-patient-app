const config = require("./dbconfig");
const mysql = require("mysql");
const axios = require("axios");

const pool = mysql.createPool(config);

async function addPatientData(Patient) {
  return new Promise((resolve, reject) => {
    let identifier;
    axios
      .get(
        "https://qa-refapp.openmrs.org/openmrs/ws/rest/v1/idgen/nextIdentifier?source=1",
        {
          auth: {
            username: "admin",
            password: "Admin123",
          },
        }
      )
      .then((res) => {
        identifier = res.data.results[0].identifierValue;

        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
            return;
          }

          const sqlQuery =
            "INSERT INTO patient (given_name, middle_name, family_name, birthdate, birthdate_estimated, gender, preferred, address1, city_village, state_province, country, postal_code, phone, is_processed, identifier, hospital) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
              false,
              identifier,
              Patient.hospital,
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
      })
      .catch((err) => {
        reject(err);
        return;
      });
  });
}

exports.addPatientData = addPatientData;
