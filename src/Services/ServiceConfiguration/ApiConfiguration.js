/*

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* EndPoints configuration API.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const BaseUrl = process.env.REACT_APP_SWISSWAI_URL;

export const EndPoints = {
  getCursusEndPoint: (etudiantValue) => {
    return `${BaseUrl}zs_etudiant_cursuses?$expand=zs_Cursus($select=_zs_cours_value,zs_datedebut,zs_name;$expand=zs_Cours($select=zs_name))&$filter=_zs_etudiant_value eq ${etudiantValue}`;
  },
  getCourseModuleEndPoint: (selectedCoursId) => {
    return `${BaseUrl}zs_module_courses?$expand=zs_moduleid($select=zs_name)&$filter=_zs_coursid_value eq ${selectedCoursId}`;
  },

  getSessionEndPoint: (etudiantValue) => {
    return `${BaseUrl}zs_presentiel_etudiants?$expand=zs_Presentiel($select=zs_datedupresentiel,zs_name,zs_horaires;$expand=zs_Cursus($select=zs_name))&$filter=_zs_etudiant_value eq ${etudiantValue}`;
  },

  getExercicePoint: (etudiantValue) => {
    return `${BaseUrl}zs_exercice_etudiants?$select=zs_statut_exercice&$expand=zs_exerciceid($select=zs_intitule,_zs_exerciceid_value;$expand=zs_cursus($select=zs_name))&$filter=_zs_etudiantid_value eq ${etudiantValue}`;
  },

  updateExerciceStatusEndPoint: (exerciceId, status) => {
    var apiUrl = `${BaseUrl}zs_exercice_etudiants(${exerciceId})`;
    var body = {
      zs_statut_exercice: status,
    };

    return { apiUrl, body };
  },

  getFactureEndPoint: (etudiantValue) => {
    return `${BaseUrl}zs_factures?$select=zs_date_facture,zs_name&$filter=(_zs_contactid_value eq ${etudiantValue} and statuscode eq 1)`;
  },

  getHistoriqueEndPoint: (etudiantValue) => {
    return `${BaseUrl}activitypointers?$select=subject&$filter=_regardingobjectid_value eq ${etudiantValue}`;
  },

  getAbsenceEndPoint: (etudiantValue) => {
    return `${BaseUrl}zs_absences?$expand=zs_cursusid($select=zs_datedebut,zs_name),zs_presentielid($select=zs_datedupresentiel)&$filter=(statuscode eq 128730001 or zs_decision eq 1 and _zs_contactid_value eq ${etudiantValue})`;
  },

  updateAbsenceStatus: (absenceId) => {
    var apiUrl = `${BaseUrl}zs_absences(${absenceId})`;
    var body = {
      statuscode: 1,
    };

    return { apiUrl, body };
  },

  getNotificationsEndPoint: (etudiantValue) => {
    return `${BaseUrl}zs_notification_fronts?$select=zs_id_notification,zs_titre_fr,zs_message_fr,zs_categorie,statuscode,createdon&$filter=_zs_contactid_value eq ${etudiantValue}`;
  },

  updateNotificationStatusEndPoint: (notificationId) => {
    var apiUrl = `${BaseUrl}zs_notification_fronts(${notificationId})`;
    var body = {
      statuscode: 128730001,
    };

    return { apiUrl, body };
  },

  getStudentEndPoint: (etudiantValue) => {
    return `${BaseUrl}contacts(${etudiantValue})?$select=zs_civilite,emailaddress1,birthdate,lastname,zs_npaetlieu,firstname,zs_rueetn,mobilephone`;
  },
  updateStudentEndPoint: (etudiantValue) => {
    return `${BaseUrl}contacts(${etudiantValue})`;
  },
  postNotificationAdminEndpoint: () => {
    return `${BaseUrl}appnotifications`;
  },
};
