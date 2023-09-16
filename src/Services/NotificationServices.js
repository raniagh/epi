import { getAsync, patchAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieve notifications data.
 * @param {string} etudiantValue - The ID of the student to retrieve notifications for.
 */
export async function GetNotificationsAsnyc(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };

  var response = await getAsync(
    EndPoints.getNotificationsEndPoint(etudiantValue),
    headers
  );
  return response;
}

/**
 * Changes the status of a notification.
 * @param {string} notificationId - The ID of the notification to change the status for.
 */
export async function changeNotificationStatusAsync(notificationId) {
  var updateParams = EndPoints.updateNotificationStatusEndPoint(notificationId);
  var token = localStorage.getItem("token");
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
  var response = await patchAsync(
    updateParams.apiUrl,
    updateParams.body,
    headers
  );
  return response;
}
