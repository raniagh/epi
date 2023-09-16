/*

=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to notification and user menu components.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
} from "reactstrap";
import userImage from "../../Assets/img/icons/user_image.png";

const UserMenu = () => {
  const navigate = useNavigate();
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
        <Media className="align-items-center">
          <span className="avatar avatar-sm rounded-circle">
            <img src={userImage} alt="" />
          </span>
        </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem className="noti-title" header tag="div">
          <h6 className="text-overflow m-0">Bienvenue</h6>
        </DropdownItem>
        <DropdownItem onClick={() => navigate("user-profile")}>
          <i className="ni ni-single-02" />
          <span>Mon profil</span>
        </DropdownItem>

        <DropdownItem>
          <i className="ni ni-user-run" />
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserMenu;
