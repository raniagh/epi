/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student absences.
* This module provides functions for retrieving and managing student absences.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync, patchAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves student absences along with associated details.
 */
export async function getAbsencesAsync(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = await getAsync(
    EndPoints.getAbsenceEndPoint(etudiantValue),
    headers
  );
  return response;
}

/**
 * Changes the status of a student absence.
 * @param {string} absenceId - The ID of the absence to change the status for.
 */
export async function changeAbsenceStatusAsync(absenceId) {
  var updateParams = EndPoints.updateAbsenceStatus(absenceId);
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
