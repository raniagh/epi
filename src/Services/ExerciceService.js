/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student exercises.
* This module provides functions for retrieving student exercises.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync, patchAsync, postAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves student exercises along with associated exercise details.
 * @returns {Promise} A promise that resolves to  the fetched student exercises data.
 */
export async function getExercicesAsync(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = await getAsync(
    EndPoints.getExercicePoint(etudiantValue),
    headers
  );
  return response;
}

/**
 * Changes the status of an exercice.
 * @param {string} exerciceId - The ID of an exercice to change the status for.
 * @param {number} status - The new value of an exercice status.
 */
export async function changeExerciceStatusAsync(exerciceId, status) {
  var updateParams = EndPoints.updateExerciceStatusEndPoint(exerciceId, status);
  var token = localStorage.getItem("token");
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
  var response = await patchAsync(
    updateParams.apiUrl,
    updateParams.body,
    headers
  );
  return response;
}

/**
 * Notify Admin after uploading an exercice file.
 * @param {object} notification - The notification object.
 */
export async function sendNotificationAdmin(notification) {
  var token = localStorage.getItem("token");
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
  var response = await postAsync(
    EndPoints.postNotificationAdminEndpoint(),
    notification,
    headers
  );
  return response;
}
