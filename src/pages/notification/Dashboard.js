/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * HTML code related to dashboard page .
    * functions for retrieving and searching student events.
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import { GetNotificationsAsnyc } from "Services/NotificationServices";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Box,
  Pagination,
} from "@mui/material";
import { pagination } from "Services/Utilities";
import TableTitle from "../../components/sections/TableTitle";
import FirebaseNotification from "./FirebaseNotification";
import LoadingSpinner from "components/UI/LoadingSpinner";

export const Dashboard = (props) => {
  const [notificationData, setNotificationData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  //Pagination
  const { nbPage, dataPerPage } = pagination(filteredData, current);
  const HandleChange = (event, page) => {
    setCurrent(page);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await GetNotificationsAsnyc(etudiantValue);
      setNotificationData(data.value);
      setFilteredData(data.value);
      setIsLoading(false);
      setError("");
    };
    fetchNotifications();
  }, []);

  //Search
  const HandleSearch = (e) => {
    const searchedValue = e.target.value;
    const data = [...notificationData];
    const filteredRows = data.filter((row) => {
      return row.zs_message_fr
        .toLowerCase()
        .includes(searchedValue.toLowerCase());
    });
    setFilteredData(filteredRows);
  };

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
        {/* Table */}
        <Row>
          <div className="col">
            <TableTitle title="Evènements" handleClick={HandleSearch} />
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "#edecf5",
                    }}
                  >
                    <TableCell
                      align="left"
                      style={{ borderRadius: "3em 0 0 3em" }}
                    >
                      Évènements
                    </TableCell>
                    <TableCell align="center">Date</TableCell>

                    <TableCell
                      align="center"
                      style={{ borderRadius: "0 3em 3em 0" }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPerPage.map((notification) => (
                    <TableRow
                      key={notification.zs_id_notification}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        {notification.zs_message_fr}
                      </TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Pagination
                count={nbPage}
                page={current}
                onChange={HandleChange}
              />
            </Box>
            <FirebaseNotification />
          </div>
        </Row>
      </Container>
    </>
  );
};
