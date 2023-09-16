/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to a session details modal.
* Calling upload file function.
* Manage the state of a session.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import Button from "../../components/UI/Button";
import UploadIcon from "../../Assets/img/icons/Upload_icon.png";
import { uploadFile } from "Services/Utilities";
import { FaRegTimesCircle } from "react-icons/fa";

const SeanceDetails = ({ isOpen, toggleModal, event }) => {
  const { title, start, end } = event; // Extract the desired properties from the event object
  const formattedStartDate = start.toLocaleString(); // Transform the start date to a formatted string
  const formattedEndDate = end.toLocaleString();
  const [status, setStatus] = useState("Présent");
  const [selectedFile, setSelectedFile] = useState(null);

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
    await uploadFile();
    setSelectedFile(null);
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpen}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal} className="seance-details_header">
        {title}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                Date de début
              </label>
              <input
                className="form-control-alternative form-control"
                type="text"
                id="input-first-name"
                value={formattedStartDate}
                disabled
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-last-name">
                Date de fin
              </label>
              <input
                className="form-control-alternative form-control"
                type="text"
                id="input-last-name"
                value={formattedEndDate}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <FormGroup>
              <>
                <label className="form-control-label" htmlFor="select-status">
                  Statut
                </label>
                <br />
                <input
                  type="radio"
                  name="status"
                  value="Présent"
                  defaultChecked={status === "Présent"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label className="form-control-label" htmlFor="present">
                  Présent
                </label>
                <br />
                <input
                  type="radio"
                  name="status"
                  value="Absent"
                  defaultChecked={status === "Absent"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label className="form-control-label" htmlFor="absent">
                  Absent
                </label>
              </>
            </FormGroup>
          </Col>
          <Col lg="6">
            {status === "Absent" && !selectedFile && (
              <>
                <label className="form-control-label" htmlFor="input-file">
                  Justification
                </label>
                <div className="image-upload">
                  <label htmlFor={`file-input`}>
                    <img src={UploadIcon} alt="upload" />
                  </label>
                  <input
                    id={`file-input`}
                    type="file"
                    onChange={(e) => onFileChange(e)}
                  />
                </div>
              </>
            )}
            {status === "Absent" && selectedFile && (
              <>
                <label className="form-control-label" htmlFor="input-file">
                  Justification
                </label>
                <div>
                  {selectedFile.name}
                  <FaRegTimesCircle
                    onClick={() => setSelectedFile(null)}
                    color="#C531C1"
                    size={16}
                    style={{ margin: "0rem 0.2rem" }}
                    title="Annuler"
                  />
                </div>
              </>
            )}
            {status === "Absent" && (
              <textarea
                type="text"
                className="form-control-alternative form-control"
                placeholder="Taper une justification"
              ></textarea>
            )}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <div className="button-group" style={{ width: "40%" }}>
          <Button
            buttonText="Annuler"
            buttonClass="cancel-button"
            handleClick={toggleModal}
          />
          <Button
            buttonText="Enregistrer"
            buttonClass="save-button"
            handleClick={onFileUpload}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default SeanceDetails;
