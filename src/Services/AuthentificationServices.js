/*

=========================================================
* Protail student SWISSWAI
=========================================================
* Authentication and Authorization Utility Functions
* This module provides utility functions for handling authentication and authorization using Azure AD B2C.
* Copyright 2023 company "Zesty Swiss"
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import jwt_decode from "jwt-decode";
import { getAsync, postAsync } from "./HttpClientService";
import { ConfigB2C } from "configurations/ConfigurationB2C";
import { ConfigB2B } from "configurations/ConfigurationB2B";

/**
 * Redirects the user to the Azure AD B2C login page.
 * This function initiates the authentication flow for the user.
 */

export function loginToADB2C() {
  var queryParams =
    "client_id=" +
    ConfigB2C.client_id +
    "&nonce=anyRandomValue" +
    "&redirect_uri=" +
    ConfigB2C.redirect_uri +
    "&scope=https://swisswaib2c.onmicrosoft.com/api/" +
    ConfigB2C.scope +
    "&response_type=code";
  var fullTokenEndpoint = ConfigB2C.tokenEndpointAuthorize + queryParams;
  window.location.href = fullTokenEndpoint;
}

/**
 * Retrieves the authorization code from the URL query parameters.
 * @returns {string} The authorization code.
 */
export function getAuthorizationCode(location) {
  var searchParams = new URLSearchParams(location.search);
  var authorizationCode = searchParams.get("code");

  if (!authorizationCode) {
    return null;
  }

  return authorizationCode;
}

/**
 * Retrieves user information after decoding the B2C access token.
 * @param {string} accessToken - The B2C access token.
 */
export async function getUserInformationAsync(accessTokenB2C) {
  var userInformation = jwt_decode(accessTokenB2C);
  return userInformation;
}

/**
 * Retrieves the B2C access token by exchanging the authorization code.
 * @param {string} location - The location object containing the authorization code.
 */
export async function getAccessTokenB2CAsync(code) {
  var tokenEndpoint = ConfigB2C.tokenEndpoint;
  var data = {
    grant_type: ConfigB2C.grant_type,
    client_id: ConfigB2C.client_id,
    client_secret: ConfigB2C.client_secret,
    redirect_uri: ConfigB2C.redirect_uri,
    scope: ConfigB2C.scope,
    code: code,
  };

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  var response = await postAsync(tokenEndpoint, data, headers);
  return response.id_token;
}

/**
 * Fetches a custom token from a local server endpoint.
 */
export async function getTokenAsync() {
  var response = await getAsync(ConfigB2B.tokenEndPoint.toString());
  //var response = await GetToken();
  return response;
}
