/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Common service functions for fetching and updating... data from Dynamics CRM.
* These functions provide asynchronous data retrieval and update ... from a Dynamics CRM API endpoint.
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import axios from "axios";

/**
 * Fetches data asynchronously from a Dynamics CRM API endpoint.
 * @param {string} url - specific URL that corresponds to the API endpoint.
 * @param {string} token - Authentication token for authorization.
 * @returns {Promise} A promise that resolves to the fetched data.
 */
export async function getAsync(url, headers) {
  try {
    var response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Sends data asynchronously to a specified API endpoint using a POST request.
 * @param {string} url - The URL of the API endpoint to send the POST request to.
 * @param {object} data - The data to be included in the POST request body.
 * @param {object} headers - Optional headers to include in the request.
 * @returns {Promise} A promise that resolves to the response data from the API.
 */
export async function postAsync(url, data, headers) {
  try {
    var response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/**
 * Updates data asynchronously using a PATCH request to a Dynamics CRM API endpoint.
 * @param {string} url - specific URL that corresponds to the API endpoint.
 * @param {object} data - The data to be updated.
 * @param {string} token - Authentication token for authorization.
 * @returns {Promise} A promise that resolves to the updated data.
 */
export async function patchAsync(url, data, headers) {
  var response = await axios.patch(url, data, {
    headers: headers,
  });

  return response.data;
}

/**
 * Updates data asynchronously using a PUT request to a Dynamics CRM API endpoint.
 * @param {string} url - specific URL that corresponds to the API endpoint.
 * @param {object} data - The data to be updated.
 * @param {string} token - Authentication token for authorization.
 * @returns {Promise} A promise that resolves to the updated data.
 */
export async function putAsync(url, data, headers) {
  var response = await axios.put(url, data, {
    headers: headers,
  });

  return response.data;
}
