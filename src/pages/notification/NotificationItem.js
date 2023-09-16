/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to one notification item.
* Manage a notification status and click.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useNavigate } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { notificationCategories } from "dictionary/NotificationDic";
import { notificationStatus } from "dictionary/NotificationDic";
import { changeNotificationStatusAsync } from "Services/NotificationServices";

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();
  const notifStatus = notificationStatus[notification.statuscode];
  const notifCategory = notificationCategories[notification.zs_categorie];

  const handleClickNotif = async () => {
    navigate(`${notifCategory}`);
    await changeNotificationStatusAsync(notification.zs_notification_frontid);
  };

  return (
    <>
      <DropdownItem
        onClick={handleClickNotif}
        className={notifStatus === "non lue" ? "unread-notif " : "read-notif"}
      >
        {notification.zs_titre_fr}
      </DropdownItem>
    </>
  );
};

export default NotificationItem;
