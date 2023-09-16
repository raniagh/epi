/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to justification component.
* Calling function for uploading justification file.
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegTimesCircle } from "react-icons/fa";
import { Card, CardHeader } from "reactstrap";
import { formatDate } from "dataConverter/DateUtils.js";
import Button from "../../../components/UI/Button";
import UploadIcon from "../../../Assets/img/icons/Upload_icon.png";
import { uploadFile } from "Services/Utilities";
import { changeAbsenceStatusAsync } from "Services/AbsenceServices";

const Justification = ({ absenceData, onClose, onReturn }) => {
  var [selectedFile, setSelectedFile] = useState(null);

  // On file select (from the pop up)
  const onFileChange = (e) => {
    e.preventDefault();
    // Update the state
    setSelectedFile(e.target.files[0]);
    e.currentTarget.value = null;
  };

  // On file upload (click the upload button)
  const onFileUpload = async (e) => {
    // Request made to the backend api
    try {
      await uploadFile(
        absenceData.zs_absenceid,
        "Absence",
        selectedFile.name,
        selectedFile
      );
      onClose();
      await changeAbsenceStatusAsync(absenceData.zs_absenceid);
      toast.success("Votre fichier est envoyé avec succés !");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Erreur d'envoi");
    }
  };

  return (
    <Card className="communication-card">
      <CardHeader className="swisswai-subtitle communication-item-header">
        Justification
      </CardHeader>
      <div className="justification-body">
        <div className="swiss-text">{absenceData.zs_cursusid.zs_name}</div>
        <div className="swiss-text">
          {formatDate(absenceData.zs_presentielid.zs_datedupresentiel)}
        </div>
        <div className="swiss-text">
          <b>Du</b> 00:00 <b>Au</b> 00:00
        </div>
        <div>
          {!selectedFile && (
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={UploadIcon} alt="icon" />
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => onFileChange(e)}
              />
            </div>
          )}

          {selectedFile && (
            <div>
              <div>
                {selectedFile.name}
                <FaRegTimesCircle
                  onClick={() => setSelectedFile(null)}
                  color="#3B1B6F"
                  size={17}
                  title="Annuler"
                />
              </div>
            </div>
          )}
        </div>
        <div className="button-group">
          <Button
            buttonText="Annuler"
            buttonClass="cancel-button"
            handleClick={onClose}
          />

          <Button
            buttonText="Enregistrer"
            buttonClass="save-button"
            handleClick={onFileUpload}
          />
        </div>
      </div>
    </Card>
  );
};

export default Justification;
