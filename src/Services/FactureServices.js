/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student factures.
* This module provides functions for retrieving student factures.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves student factures along with associated invoice details.
 */
export async function getFacturesAsnyc(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };

  var response = await getAsync(
    EndPoints.getFactureEndPoint(etudiantValue),
    headers
  );
  return response;
}
