/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student profile.
* This module provides functions for retrieving and updating student profile data.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync, patchAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Get student profile data.
 * @param {string} studentId - The ID of the student whose profile data is to be displayed.
 * @returns {Promise} A promise that resolves to the student profile data.
 */
export async function getStudentAsync(studentId) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = await getAsync(
    EndPoints.getStudentEndPoint(studentId),
    headers
  );

  return response;
}

/**
 * Changes student profile data.
 * @param {string} studentId - The ID of the student whose profile data is to be changed.
 * @param {object} formData - The updated profile data.
 * @returns {Promise} A promise that resolves to the updated profile data.
 */
export async function changeStudentDataAsync(studentId, formData) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await patchAsync(
    EndPoints.updateStudentEndPoint(studentId),
    formData,
    headers
  );
  return response;
}
