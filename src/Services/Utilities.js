/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Shared functions between application components.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  extractId,
  getDriveByNameAsync,
  getDriveItemsAsync,
  getItemByIdAsync,
  getItemByNameAsync,
  getItemChildrenAsync,
  getSharepointSiteAsync,
  uploadFileAsync,
} from "./SharePointServices";

/**
 * retrieve global SharePoint settings.
 * @param {string} targetDrive - The target of drive.
 * @returns {Object} An Object that contain global SharePoint parameters .
 */
const globalsharePoint = async (targetDrive) => {
  try {
    var sharePointToken = localStorage.getItem("SharePointToken");
    var siteSharePointcompleted = await getSharepointSiteAsync(sharePointToken);
    var siteSharePointId = extractId(siteSharePointcompleted);
    var targetDriveId = await getDriveByNameAsync(targetDrive, sharePointToken);
    var items = await getDriveItemsAsync(
      sharePointToken,
      targetDriveId,
      siteSharePointId
    );
    return { sharePointToken, siteSharePointId, items, targetDriveId };
  } catch (error) {}
};

/**
 * Uploads file in sharePoint.
 * @param {string} targetDrive - The target of drive.
 * @param {string} recordId - The ID of the object whose related file path is to be downloaded.
 * @param {string} documentType - The type of the file as defined in the SharePoint .
 * @returns {Promise} A promise that resolves to the file data.
 */
const downloadFile = async (targetDrive, recordId, documentType) => {
  try {
    var { sharePointToken, siteSharePointId, items, targetDriveId } =
      await globalsharePoint(targetDrive);
    var itemId = await getItemByIdAsync(items, recordId);
    var itemChildren = await getItemChildrenAsync(
      sharePointToken,
      itemId,
      siteSharePointId,
      targetDriveId,
      documentType
    );
    return itemChildren;
  } catch (error) {}
};

/**
 * Uploads file in sharePoint.
 * @param {string} recordId - The ID of the object whose related file path is to be changed.
 * @param {string} targetDrive - The target of drive.
 * @param {string} fileName - The name of the file that will be uploaded.
 * @param {object} fileContent - The content of the file that will be uploaded..
 * @param {string} subFolder - The subfolder in the sharePoint.
 * @returns {Promise} A promise that resolves to the upload file data.
 */
const uploadFile = async (
  recordId,
  targetDrive,
  fileName,
  fileContent,
  subFolder
) => {
  var { sharePointToken, siteSharePointId, items, targetDriveId } =
    await globalsharePoint(targetDrive);
  var itemName = await getItemByNameAsync(items, recordId);
  await uploadFileAsync(
    siteSharePointId,
    targetDriveId,
    itemName,
    fileName,
    fileContent,
    sharePointToken,
    subFolder
  );
};

/**
 * Data pagination.
 * @param {object} data - data that needs to be paginated.
 * @param {number} current - The ID of the contact whose profile data is to be changed.
 * @returns {object} An object that contain number of pages and the data per page.
 */
const pagination = (data, current) => {
  var items = 5;
  var pagesCount = Math.ceil(data.length / items);
  var startIndex = (current - 1) * items;
  var endIndex = startIndex + items;
  var dataPerPage = data.slice(startIndex, endIndex);
  return { pagesCount, dataPerPage };
};

export { downloadFile, uploadFile, pagination };
