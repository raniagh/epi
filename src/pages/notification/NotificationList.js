/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to notifications list.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { DropdownMenu, DropdownItem } from "reactstrap";
import NotificationItem from "./NotificationItem";
import { useNavigate } from "react-router-dom";

const NotificationList = ({ notifications }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu className="notification-nav dropdown-menu-arrow" right>
      <DropdownItem className="noti-title" header tag="div">
        <div
          className="text-overflow m-0"
          style={{ color: "black", cursor: "pointer" }}
          onClick={() => navigate("dashboard")}
        >
          Notifications
        </div>
      </DropdownItem>
      {notifications.map((notification) => (
        <NotificationItem
          notification={notification}
          key={notification.zs_notification_frontid}
        />
      ))}
    </DropdownMenu>
  );
};

export default NotificationList;
