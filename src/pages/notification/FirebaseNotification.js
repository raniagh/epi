/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* Manage the state of a firebase notification.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "configurations/Firebase";
import { toast } from "react-toastify";

function FirebaseNotification() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });

      toast.success(
        `${payload?.notification?.title}: ${payload?.notification?.body}`
      );
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, []);
  return <div>{notification.title}</div>;
}
export default FirebaseNotification;
