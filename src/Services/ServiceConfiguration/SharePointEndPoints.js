export const BaseUrl = "https://graph.microsoft.com/beta/sites/";

export const ShareEndPoints = {
  loginEndPoint: (tenantId) => {
    return `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
  },
  getSharepointSite: (tenantName, siteName) => {
    return `${BaseUrl}${tenantName}.sharepoint.com:/sites/${siteName}`;
  },
  getSiteDrives: (siteId) => {
    //Get it from GetSharepointSite
    return `${BaseUrl}${siteId}/drives`; // site id"id": "zestyswiss.sharepoint.com,/*e52f6ca7-636e-4439-8c95-567596a44e52*/,28c8083b-da23-48dd-8f1b-46fe5c930693",
  },
  getDriveItems: (siteId, driveId) => {
    return `${BaseUrl}${siteId}/drives/${driveId}/items/root/children`;
  },

  getExerciceStudentRelatedItems: (exerciceStudentId) => {
    return `https://swisswai.crm17.dynamics.com/api/data/v9.2/sharepointdocumentlocations?$filter=_regardingobjectid_value eq ${exerciceStudentId}`;
  },
  getItem: (itemId, siteId, driveId) => {
    return `${BaseUrl}${siteId}/drives/${driveId}/items/${itemId}`;
  },

  getItemChildren: (itemId, siteId, driveId) => {
    return `${BaseUrl}${siteId}/drives/${driveId}/items/${itemId}/children`;
  },
  uploadFile: (siteId, driveId, itemName, fileName, subFolder) => {
    return subFolder
      ? `${BaseUrl}${siteId}/drives/${driveId}/root:/${itemName}/${subFolder}/${fileName}:/content`
      : `${BaseUrl}${siteId}/drives/${driveId}/root:/${itemName}/${fileName}:/content`;
  },
};
