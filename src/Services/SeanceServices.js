/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student agenda.
* This module provides functions for retrieving student agenda data.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves student agenda session data.
 */
export async function getSessionAsync(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = await getAsync(
    EndPoints.getSessionEndPoint(etudiantValue),
    headers
  );
  return response;
}
