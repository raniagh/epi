/*!

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* B2B configuration server file.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/**
 * Configuration object to be passed to B2B instance on creation.
 * MSAL node configuration.
 */
const ConfigB2BServer = {
  msalConfig: {
    auth: {
      clientId: process.env.CLIENT_ID,
      authority: process.env.AUTHORITY,
      clientSecret: process.env.CLIENT_SECRET,
    },
  },
  scopes: [process.env.BB_SCOPES],
};

module.exports = ConfigB2BServer;
