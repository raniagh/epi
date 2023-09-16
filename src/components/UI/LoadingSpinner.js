/*!

=========================================================
* Portail étudiant SWISSWAI
=========================================================

* Loading Spinner dispalyed when data is loading.
* Copyright 2023 company "Zesty Swiss"

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
    </div>
  );
};

export default LoadingSpinner;
