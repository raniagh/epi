/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to global notifications component.
* Manage the state of readed and unreaded notifications.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState, useCallback } from "react";
import { FaRegBell } from "react-icons/fa";
import { UncontrolledDropdown, DropdownToggle, Media } from "reactstrap";
import "./Notification.css";
import NotificationList from "./NotificationList";
import { GetNotificationsAsnyc } from "Services/NotificationServices";

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [unread, setUnread] = useState([]);
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  const fetchNotifications = useCallback(async () => {
    const data = await GetNotificationsAsnyc(etudiantValue);
    setNotificationData(data.value);
    setUnread(data.value.filter((item) => item.statuscode === 1));
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
        <Media className="align-items-center">
          <FaRegBell size={25} color="#ffffff" />
          <span className="icon-button__badge">{unread.length}</span>
        </Media>
      </DropdownToggle>
      <NotificationList notifications={notificationData} />
    </UncontrolledDropdown>
  );
};

export default Notification;
