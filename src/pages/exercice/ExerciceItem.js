/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to only one exercice item.
* Manage the state of an exercice.
* Calling functions for uploading and downloading exercice files.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { downloadFile, uploadFile } from "Services/Utilities";
import DownloadIcon from "../../Assets/img/icons/Download_icon.png";
import UploadIcon from "../../Assets/img/icons/Upload_icon.png";
import { TableCell, TableRow } from "@mui/material";
import { FaRegFilePdf, FaRegSave, FaRegTimesCircle } from "react-icons/fa";
import { changeExerciceStatusAsync } from "Services/ExerciceService";
import LoadingSpinner from "components/UI/LoadingSpinner";

const ExerciceItem = ({ exercice }) => {
  const [supportPath, setSupportPath] = useState("");
  const [corrigePath, setCorrigePath] = useState("");
  const [renduPath, setRenduPath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const status = exercice.zs_statut_exercice;

  useEffect(() => {
    const fetchDocPath = async () => {
      const support = await downloadFile(
        "Exercice",
        exercice.zs_exerciceid._zs_exerciceid_value
      );

      support && setSupportPath(support);

      if (status === 1) {
        const rendu = await downloadFile(
          "Exercice par étudiant",
          exercice.zs_exercice_etudiantid,
          "Rendus"
        );
        rendu && setRenduPath(rendu);
      }

      if (status === 2) {
        const corrige = await downloadFile(
          "Exercice par étudiant",
          exercice.zs_exercice_etudiantid,
          "Corrigés"
        );
        corrige && setCorrigePath(corrige);
      }
      setIsLoading(false);
    };
    fetchDocPath();
  }, [
    exercice.zs_exercice_etudiantid,
    status,
    exercice.zs_exerciceid._zs_exerciceid_value,
  ]);

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
    await uploadFile(
      exercice.zs_exercice_etudiantid,
      "Exercice par étudiant",
      selectedFile.name,
      selectedFile,
      "Rendus"
    );
    await changeExerciceStatusAsync(exercice.zs_exercice_etudiantid, 1);
    //Send Notification to inform the Admin after sending new file
    /*   const notification = {
      Title: "Nouveau exercice envoyé",
      Body: selectedFile,
      Recipient: "/systemusers(<Guid of the user>)",
      IconType: 100000000, // info
      ToastType: 200000000, // timed
    }; */
    // await sendNotificationAdmin(notification);
    setSelectedFile(null);
    setError("");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="left">{exercice.zs_exerciceid.zs_intitule}</TableCell>
      <TableCell align="center">
        {supportPath ? (
          <Link to={supportPath} download>
            <img src={DownloadIcon} alt="" />
          </Link>
        ) : (
          <div> - </div>
        )}
      </TableCell>
      <TableCell
        align="center"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {(status === 0 || status === 1) && !selectedFile && (
          <div className="image-upload">
            <label
              htmlFor={`file-input${exercice.zs_exerciceid._zs_exerciceid_value}`}
            >
              <img src={UploadIcon} alt="icon" />
            </label>
            <input
              id={`file-input${exercice.zs_exerciceid._zs_exerciceid_value}`}
              type="file"
              onChange={(e) => onFileChange(e)}
            />
          </div>
        )}
        {status === 1 && !selectedFile && (
          <Link to={renduPath} download>
            <FaRegFilePdf color="#3B1B6F" size={17} />
          </Link>
        )}
        {selectedFile && (
          <div>
            <div>
              {selectedFile.name}
              <FaRegTimesCircle
                onClick={() => setSelectedFile(null)}
                color="#C531C1"
                size={16}
                style={{ margin: "0rem 0.2rem" }}
                title="Annuler"
              />
              <FaRegSave
                onClick={(e) => onFileUpload(e)}
                color="#3B1B6F"
                size={16}
                title="Enregistrer"
              />
            </div>
          </div>
        )}
      </TableCell>

      <TableCell align="center">
        {status === 2 ? (
          <Link to={corrigePath} download>
            <img src={DownloadIcon} alt="" />
          </Link>
        ) : (
          <div> - </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ExerciceItem;
