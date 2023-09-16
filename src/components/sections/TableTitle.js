/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code for a shared part between pages.
* Represents main title of page and search bar.
* Copyright 2023 company "Zesty Swiss".s
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Input from "../UI/Input";

const TableTitle = ({ title, handleClick }) => {
  return (
    <div className="table-title">
      <div className="swisswai-table-title">{title}</div>
      <Input
        placeholder="Rechercher..."
        type="text"
        handleChange={handleClick}
      />
    </div>
  );
};

export default TableTitle;
