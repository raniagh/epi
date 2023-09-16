/*!

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Sharepoint configuration file.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
export const SharePointConfiguration = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  resource: process.env.REACT_APP_RESOURCE,
  grant_type: "client_credentials",
  TenantName: process.env.REACT_APP_TENANT_NAME,
  TenantId: process.env.REACT_APP_TENANT_ID,
  SiteName: "swisswai",
};
