/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to session page .
* functions for retrieving and searching student sessions.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr.js";
import { Card, Container, Row } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import SeanceDetails from "./SeanceDetails";
import { getSessionAsync } from "Services/SeanceServices";
import "./Seance.css";
import LoadingSpinner from "components/UI/LoadingSpinner";

const localizer = momentLocalizer(moment);

export const Seance = () => {
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [myEventsList, setMyEventsList] = useState([]); // Changed variable name to be more consistent
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(undefined);
  };

  useEffect(() => {
    (async () => {
      const data = await getSessionAsync(etudiantValue);
      setMyEventsList(
        data.value.map((event) => ({
          id: event.zs_presentiel_etudiantid,
          title: event.zs_Presentiel.zs_name.concat(
            " ",
            "du",
            " ",
            event.zs_Presentiel.zs_Cursus.zs_name
          ),
          start: moment(event.zs_Presentiel.zs_datedupresentiel).toDate(),
          end: moment(event.zs_Presentiel.zs_datedupresentiel).toDate(),
        }))
      );
      setIsLoading(false);
      setError("");
    })();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="calendar-main-content">
          <div className="col">
            <div
              className="swisswai-table-title"
              style={{ marginBottom: "2rem" }}
            >
              Agenda
            </div>
            <Card className="agenda shadow border-0">
              {selectedEvent && (
                <SeanceDetails
                  className="modal-dialog-centered"
                  isOpen={true}
                  toggleModal={closeModal}
                  event={selectedEvent}
                />
              )}
              <Calendar
                defaultView="month"
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{
                  height: 500,
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onSelectEvent={handleSelectedEvent}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
