/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to historic component.
* Manage the state of historic.
* Calling function for fetching historic data.
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getHistoriqueAsync } from "Services/HistoriqueServices";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const Historique = () => {
  var [historiqueData, setHistoriqueData] = useState([]);
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  useEffect(() => {
    (async () => {
      const data = await getHistoriqueAsync(etudiantValue);
      setHistoriqueData(data.value);
    })();
  }, []);

  return (
    <Card className="communication-card">
      <CardHeader className="swisswai-subtitle communication-item-header">
        Historique Communications
      </CardHeader>
      <CardBody className="communication-card__body">
        <div>
          <ListGroup className="communication-card__list">
            {historiqueData.map((event) => (
              <ListGroupItem
                key={event.activityid}
                className="d-flex align-items-center"
              >
                <div className="circle-icon">RP</div>
                <div className="text-column">
                  <div>{event.subject}</div>
                </div>
                {/* Add the rest of your ListGroupItem content */}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default Historique;
