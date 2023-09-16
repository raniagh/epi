/*!

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Global input component customizable with specific properties.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { FaSearch } from "react-icons/fa";
import "./Input.css";

const Input = ({ placeholder, type, handleChange }) => {
  return (
    <div className="input-icons">
      <FaSearch className="icon" />

      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Input;
