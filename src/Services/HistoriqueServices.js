/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student historique.
* This module provides functions for retrieving student historique.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves student historique data.
 */
export async function getHistoriqueAsync(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };

  var response = await getAsync(
    EndPoints.getHistoriqueEndPoint(etudiantValue),
    headers
  );
  return response;
}
