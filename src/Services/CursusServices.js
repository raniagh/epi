/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Service functions related to student exercises.
* This module provides functions for retrieving student exercises.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { getAsync } from "./HttpClientService.js";
import { EndPoints } from "./ServiceConfiguration/ApiConfiguration.js";

/**
 * Retrieves the student cursus along with associated course details.
 */
export async function getStudentCursusAsync(etudiantValue) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = await getAsync(
    EndPoints.getCursusEndPoint(etudiantValue),
    headers
  );
  return response;
}
/* 
/**
 * Retrieves the course modules for a selected course.
 * @param {string} selectedCoursId - The ID of the selected course.
 */
export async function getCourseModuleAsync(selectedCoursId) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  var response = getAsync(
    EndPoints.getCourseModuleEndPoint(selectedCoursId),
    headers
  );
  return response;
}

/**
 * Retrieves the historique data for a specific cursus.
 * @param {string} cursusId - The ID of the cursus.
 */
export async function getCursusHistoriqueAsync(cursusId) {
  var response = getAsync(
    `activitypointers?$select=subject,scheduledstart&$filter=_regardingobjectid_value eq ${cursusId}`
  );
  return response;
}
