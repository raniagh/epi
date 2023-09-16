/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code for the earliest date that the student should know.
* Copyright 2023 company "Zesty Swiss".s
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { formatDate } from "dataConverter/DateUtils.js";
import { FaClock, FaRegCalendar } from "react-icons/fa";
import { getStudentCursusAsync } from "Services/CursusServices";

const NotificationBar = () => {
  const [approachDate, setApproachDate] = useState(null);
  const [cursusName, setCursusName] = useState(null);
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  // Inside your component
  useEffect(() => {
    const fetchCursus = async () => {
      var cursusResponse = await getStudentCursusAsync(etudiantValue);
      var cursusList = cursusResponse.value;
      if (cursusList.length > 0) {
        let closestCursus = cursusList[0];
        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();
        for (const cursus of cursusList) {
          const cursusStartDate = new Date(cursus.zs_Cursus.zs_datedebut);
          const cursusStartTimestamp = cursusStartDate.getTime();
          if (
            cursusStartTimestamp >= currentTimestamp &&
            cursusStartTimestamp <
              new Date(closestCursus.zs_Cursus.zs_datedebut).getTime()
          ) {
            closestCursus = cursus;
          }
        }
        if (closestCursus.zs_Cursus.zs_datedebut) {
          setCursusName(closestCursus.zs_Cursus.zs_name);
          const startCursusDate = new Date(
            closestCursus.zs_Cursus.zs_datedebut
          );
          setApproachDate(formatDate(startCursusDate)); // Format date and set in state
        }
      }
    };
    fetchCursus();
  }, []);

  return (
    <Card
      className="card-stats"
      style={{
        background:
          "linear-gradient(to right bottom, #a682fc, #8b67d7, #6f4cb3, #553390, #3b1b6f)",

        borderRadius: "15px",

        marginTop: "30px",

        display: "flex",

        flexDirection: "row", // Adjusted to row to align content horizontally

        alignItems: "center", // Center align items vertically

        position: "relative",

        padding: "10px",
        border: "0px",
      }}
    >
      {/* Circle icon with alarm symbol */}

      <div
        style={{
          width: "70px",

          height: "70px",

          borderRadius: "50%",

          textAlign: "center",

          fontSize: "40px",

          color: "#f9a53b",

          background: "white",

          position: "absolute",

          left: "-35px",

          top: "50%",

          transform: "translateY(-50%)",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          marginRight: "15px", // Margin right added
        }}
      >
        <FaClock color="00FF49" size={48} />
      </div>

      <div
        style={{
          display: "flex",

          flexDirection: "column", // Align text vertically

          marginLeft: "50px", // Adjusted margin for spacing
          flex: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaRegCalendar color="#F6F1FB" style={{ marginRight: "0.5rem" }} />

          <p
            className="user-header-title mb-0 text-left"
            style={{
              marginBottom: "5px",
              color: "#F6F1FB",
            }}
          >
            Prochain rappel
          </p>
        </div>

        <p
          className="user-header-title"
          style={{
            fontSize: "15px", // Using relative font size
          }}
        >
          {cursusName ? `Début du ${cursusName}` : ""}
        </p>
      </div>

      <CardBody
        style={{
          flexGrow: 1,
        }}
      >
        <span
          className="user-header-title mb-0 "
          style={{
            fontSize: "15px", // Using relative font size
          }}
        >
          {approachDate}
        </span>
      </CardBody>
    </Card>
  );
};

export default NotificationBar;
