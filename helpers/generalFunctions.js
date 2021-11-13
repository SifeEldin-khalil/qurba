/** Constants */
require('dotenv').config();
const jwt = require("jsonwebtoken");
const config = require('../config/index.config');

/**Vali dating the token */
const validateToken = async (token) => {
  let result = null;
  await jwt.verify(token, config.dotEnv.SECRET_KEY, (err, decoded) => {
    if (decoded) {
      result = decoded;
    }
  });
  return result;
};

/** Increase date by days */
const addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/** Increase date by hours */
const addHours = (date, hours) => {
  let newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

/** Increase date by seconds */
const addSec = (date, sec) => {
  let newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() + sec);
  return newDate;
}

module.exports = {
  validateToken,
  addDays,
  addHours,
  addSec
}
