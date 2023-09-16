// Import required modules
var express = require("express");
var cors = require("cors");
require("dotenv").config();
var msal = require("@azure/msal-node");
const path = require("path");

// Create an instance of the Express application
var app = express();

// Enable CORS for all domains
app.use(cors());

// Define the server port
var serverPort = process.env.SERVER_PORT || 8080;

// Import MSAL configurations
var ConfigB2BServer = require("./ConfigurationB2BServer");

// Create a Confidential Client Application (CCA) instance for B2B
var ccaB2B = new msal.ConfidentialClientApplication(ConfigB2BServer.msalConfig);

// Define an endpoint to get a B2B access token
app.get("/getToken", async (req, res) => {
  const tokenRequest1 = {
    scopes: ConfigB2BServer.scopes,
    forceRefresh: false,
  };
  try {
    // Acquire the access token using Client Credential Flow for B2B
    var authResponse = await ccaB2B.acquireTokenByClientCredential(
      tokenRequest1
    );
    // Send the access token in the HTTP response
    res.send(authResponse.accessToken);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).send(error);
  }
});

// Define an endpoint to get a SharePoint access token
app.get("/getSharePointToken", async (req, res) => {
  const tokenRequest2 = {
    scopes: [process.env.SHAREPOINT_SCOPES],
    forceRefresh: false,
  };
  try {
    // Acquire the access token using Client Credential Flow for SharePoint
    var authResponse = await ccaB2B.acquireTokenByClientCredential(
      tokenRequest2
    );
    // Send the access token in the HTTP response
    res.send(authResponse.accessToken);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).send(error);
  }
});

// production script
app.use(express.static("./ZS_SWISSWAI_PORTAIL/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "ZS_SWISSWAI_PORTAIL", "build", "index.html")
  );
});

// Start the server and listen on the defined port
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
