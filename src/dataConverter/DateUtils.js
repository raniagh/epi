/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* Functions for formatting date.
* Copyright 2023 company "Zesty Swiss".
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const options = { year: "numeric", month: "2-digit", day: "2-digit" };
/**
 * Convert a date string into a formatted date string.
 * @param {string} dateString.
 * @returns {string} formatted date string.
 */
export const formatDate = (dateString) => {
  var date = new Date(dateString);
  var result = date.toLocaleDateString("en-GB", options).replace(/\//g, ".");
  return result;
};

/**
 * Create date with a specific format of "dd.mm.yyyy"
 * @param {Date} date.
 * @returns {string} specific date format.
 */
export const formattedDate = (date) => {
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  var result = `${day}.${month}.${year}`;
  return result;
};
