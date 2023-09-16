/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* Calling login B to C function.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { ConfigB2C } from "configurations/ConfigurationB2C";
import { useEffect } from "react";

export const Login = () => {
  useEffect(() => {
    var queryParams =
      "client_id=" +
      ConfigB2C.client_id +
      "&nonce=anyRandomValue" +
      "&redirect_uri= " +
      "&scope=https://swisswaib2c.onmicrosoft.com/api/" +
      ConfigB2C.scope +
      "&response_type=code";
    // var fullTokenEndpoint = ConfigB2C.tokenEndpointAuthorize + queryParams;
    window.location.href =
      "https://swisswaib2c.b2clogin.com/swisswaib2c.onmicrosoft.com/B2C_1_SignIn/oauth2/v2.0/authorize?" +
      queryParams;
  });
};
