/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* B2C configuration file.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/**
 * Configuration object to be passed to B2C instance on creation.
 */

export var ConfigB2C = {
  grant_type: "authorization_code",
  client_id: process.env.REACT_APP_BC_CLIENT_ID,
  client_secret: process.env.REACT_APP_BC_CLIENT_SECRET,
  redirect_uri: "https://dapper-jalebi-101d7d.netlify.app",
  scope: "openid offline_access",
  tokenEndpoint: process.env.REACT_APP_BC_LOGIN_URL,
  tokenEndpointAuthorize: process.env.REACT_APP_BC_AUTHORIZE_URL,
};
