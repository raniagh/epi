/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to absence component.
* Manage the state of absences.
* Calling function for fetching absence data.
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { formatDate } from "dataConverter/DateUtils.js";
import { getAbsencesAsync } from "Services/AbsenceServices";
import "./Absence.css";

const Absence = ({ onAbsenceClick }) => {
  const [absenceData, setAbsenceData] = useState([]);
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  useEffect(() => {
    (async () => {
      const data = await getAbsencesAsync(etudiantValue);
      setAbsenceData(data.value);
    })();
  }, []);

  return (
    <Card className="communication-card">
      <CardHeader className="swisswai-subtitle communication-item-header">
        Absences à justifier
      </CardHeader>
      <CardBody className="communication-card__body">
        <div>
          <ListGroup className="communication-card__list">
            {absenceData.length === 0 ? (
              <ListGroupItem>Aucune absences à justifier.</ListGroupItem>
            ) : (
              absenceData.map((absence) => (
                <ListGroupItem
                  key={absence.zs_absenceid}
                  className="absence-items d-flex align-items-center"
                >
                  <div className="circle-icon">A</div>
                  <div className="text-column">
                    <div
                      onClick={(e) => {
                        onAbsenceClick(absence.zs_absenceid, absence); // Pass the absence data along with the id
                      }}
                      className="swiss-text"
                    >
                      {absence.zs_cursusid.zs_name} - Absence séance du{" "}
                      {formatDate(absence.zs_presentielid.zs_datedupresentiel)}
                    </div>
                  </div>
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default Absence;
