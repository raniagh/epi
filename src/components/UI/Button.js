/*!

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Global button component customizable with a specific text and css styles.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "./Button.css";

const Button = ({ buttonText, buttonClass, handleClick }) => {
  return (
    <button className={buttonClass} onClick={(e) => handleClick(e)}>
      {buttonText}
    </button>
  );
};

export default Button;
