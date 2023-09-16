/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * HTML code related to communication module .
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
import { Card, CardHeader, Container } from "reactstrap";
import Notification from "../notification/Notification";
import Historique from "./components/Historique";
import Absence from "./components/Absence";
import Justification from "./components/Justification";
import ChatInput from "./components/ChatInput";
import UserMenu from "components/sections/UserMenu";
import "./Communication.css";

const Communication = () => {
  const [selectedAbsenceId, setSelectedAbsenceId] = useState(null);
  const [selectedAbsenceData, setSelectedAbsenceData] = useState(null); // Added state to hold selected absence data

  const handleAbsenceClick = (absenceId, absenceData) => {
    setSelectedAbsenceId(absenceId);
    setSelectedAbsenceData(absenceData); // Set selected absence data
  };

  const handleJustificationClose = () => {
    setSelectedAbsenceId(null);
    setSelectedAbsenceData(null); // Reset selected absence data
  };
  const handleReturn = () => {
    setSelectedAbsenceId(null);
    setSelectedAbsenceData(null);
  };

  return (
    <Container fluid className="communication-conatiner">
      <Card className="communication">
        <CardHeader className="communication-header">
          <div className="swisswai-title">Communications</div>
          <div className="d-flex align-items-center">
            <Notification />
            <UserMenu />
          </div>
        </CardHeader>
        <div className="communication-body">
          {selectedAbsenceId ? (
            <Justification
              absenceData={selectedAbsenceData}
              onClose={handleJustificationClose}
              onReturn={handleReturn} // Pass the onReturn function
            />
          ) : (
            <Absence
              onAbsenceClick={handleAbsenceClick}
              onReturn={handleReturn} // Pass the onReturn function
            />
          )}
          <Historique />
        </div>
        <ChatInput />
      </Card>
    </Container>
  );
};
export default Communication;
