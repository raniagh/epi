/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * HTML code related to loading page .
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { CircularProgress } from "@mui/material";
import Logo from "../../Assets/img/icons/Swisswai_logo.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={Logo} alt="Logo" className="logo" />
      <CircularProgress className="circular-progress" />
    </div>
  );
};

export default Loading;
