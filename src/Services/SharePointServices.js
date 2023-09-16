/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to sharepoint.
* This module provides functions for retrieving and uploading files from sharepoint .
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { SharePointConfiguration } from "configurations/ConfigurationSharepoint";
import { getAsync, putAsync } from "./HttpClientService";
import { ShareEndPoints } from "./ServiceConfiguration/SharePointEndPoints";

/**
 * Retrieve SharePoint access token.
 */
export async function getSharePointTokenAsync() {
  var response = await getAsync(
    `${process.env.REACT_APP_NODE_URL}/getSharePointToken`
  );
  return response;
}

export function extractId(idString) {
  var idParts = idString.split(",");
  return idParts[1];
}
/**
 * Retrieve SharePoint Site.
 * @param {string} sharePointToken - The access token to the SharePoint.
 */
export async function getSharepointSiteAsync(sharePointToken) {
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + sharePointToken,
  };
  var response = await getAsync(
    ShareEndPoints.getSharepointSite(
      SharePointConfiguration.TenantName,
      SharePointConfiguration.SiteName
    ),
    headers
  );
  return response.id;
}

/**
 * Retrieve SharePoint drives.
 * @param {string} sharePointToken - The access token to the SharePoint.
 */
export async function getDrivesAsync(sharePointToken) {
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + sharePointToken,
  };
  var completeSiteId = await getSharepointSiteAsync(sharePointToken);
  var siteId = extractId(completeSiteId);
  var response = await getAsync(ShareEndPoints.getSiteDrives(siteId), headers);
  return response;
}

/**
 * Retrieve SharePoint drive which has a specific name.
 * @param {string} driveName - The SharePoint drive's name.
 * @param {string} sharePointToken - The access token to the SharePoint.
 */
export async function getDriveByNameAsync(driveName, sharePointToken) {
  var drives = await getDrivesAsync(sharePointToken);
  var drive = drives.value.find((drive) => drive.name === driveName);
  if (drive) {
    return drive.id;
  } else {
    return null; // Return null if the drive with the given name is not found
  }
}

/**
 * Retrieve SharePoint drive elements.
 * @param {string} sharePointToken - The access token to the SharePoint.
 * @param {string} driveId - The SharePoint drive's id.
 * @param {string} siteId - The SharePoint sites's id.
 */
export async function getDriveItemsAsync(sharePointToken, driveId, siteId) {
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + sharePointToken,
  };
  var items = await getAsync(
    ShareEndPoints.getDriveItems(siteId, driveId),
    headers
  );
  return items;
}

/**
 * Retrieve SharePoint drive element by id.
 * @param {object} driveItems - The SharePoint drive items.
 * @param {string} recordId - element whith an associated file by its id.
 */
export function getItemByIdAsync(driveItems, recordId) {
  var formattedId = recordId.replace(/[{}-]/g, "").toUpperCase();
  var matchingItem = driveItems.value.find((driveItem) => {
    return driveItem.name.includes(formattedId);
  });

  if (matchingItem) {
    return matchingItem.id;
  } else {
    return null;
  }
}

/**
 * Retrieve SharePoint drive element by name.
 * @param {object} driveItems - The SharePoint drive items.
 * @param {string} recordId - element whith an associated file by its id.
 */
export function getItemByNameAsync(driveItems, recordId) {
  var formattedId = recordId.replace(/[{}-]/g, "").toUpperCase();
  var matchingItem = driveItems.value.find((driveItem) => {
    return driveItem.name.includes(formattedId);
  });

  if (matchingItem) {
    return matchingItem.name;
  } else {
    return null;
  }
}

/**
 * retrieve file path.
 * @param {string} sharePointToken - The access token to the SharePoint.
 * @param {string} driveId - The SharePoint drive's id.
 * @param {string} siteId - The SharePoint sites's id.
 * @param {string} itemId - The SharePoint element id.
 * @param {string} folderNameFilter - The file's folder name.
 */
export async function getItemChildrenAsync(
  sharePointToken,
  itemId,
  siteId,
  driveId,
  folderNameFilter
) {
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + sharePointToken,
  };

  async function getPDFUrlRecursiveAsync(itemId) {
    var response = await getAsync(
      ShareEndPoints.getItemChildren(itemId, siteId, driveId),
      headers
    );
    for (var child of response.value) {
      if (child.file && child.file.mimeType === "application/pdf") {
        return child["@microsoft.graph.downloadUrl"];
      }
      if (!folderNameFilter || child.name === folderNameFilter) {
        var pdfUrl = await getPDFUrlRecursiveAsync(child.id);
        if (pdfUrl) {
          return pdfUrl;
        }
      }
    }
    return null;
  }
  var pdfUrl = await getPDFUrlRecursiveAsync(itemId);
  return pdfUrl;
}

/**
 * upload SharePoint file into device.
 * @param {string} driveId - The SharePoint drive's id.
 * @param {string} siteId - The SharePoint sites's id.
 * @param {string} itemName - The SharePoint element name.
 * @param {string} fileName - file name.
 * @param {object} fileContent - file contenet.
 * @param {string} sharePointToken - The access token to the SharePoint.
 */
export async function uploadFileAsync(
  siteId,
  driveId,
  itemName,
  fileName,
  fileContent,
  sharePointToken,
  subFolder
) {
  var headers = {
    Authorization: "Bearer " + sharePointToken,
  };

  var items = await putAsync(
    ShareEndPoints.uploadFile(siteId, driveId, itemName, fileName, subFolder),
    fileContent,
    headers
  );

  return items;
}
