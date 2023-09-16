/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to exercices page .
* functions for retrieving and searching student exercices.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// core components
import { useState, useEffect } from "react";
// reactstrap components
import { Container, Row } from "reactstrap";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Box,
  Pagination,
} from "@mui/material";

import ExerciceItem from "./ExerciceItem";
import { pagination } from "Services/Utilities";
import TableTitle from "../../components/sections/TableTitle";
import { getExercicesAsync } from "Services/ExerciceService";

export const Exercice = () => {
  const [exerciceData, setExerciceData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  //Pagination
  const { nbPage, dataPerPage } = pagination(filteredData, current);
  const HandleChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    (async () => {
      var data = await getExercicesAsync(etudiantValue);
      setExerciceData(data.value);
      setFilteredData(data.value);
    })();
  }, []);

  //Search
  const HandleSearch = (e) => {
    const searchedValue = e.target.value;
    const data = [...exerciceData];
    const filteredRows = data.filter((row) => {
      return row.zs_exerciceid.zs_intitule
        .toLowerCase()
        .includes(searchedValue.toLowerCase());
    });
    setFilteredData(filteredRows);
  };

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="main-content_row">
          <div className="col">
            <TableTitle title="Exercices" handleClick={HandleSearch} />
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
                      Exercice
                    </TableCell>
                    <TableCell align="center">Support</TableCell>
                    <TableCell align="center">À corriger</TableCell>
                    <TableCell
                      align="center"
                      style={{ borderRadius: "0 3em 3em 0" }}
                    >
                      Correction
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPerPage.map((exercice) => (
                    <ExerciceItem
                      exercice={exercice}
                      key={exercice.zs_exercice_etudiantid}
                    />
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
          </div>
        </Row>
      </Container>
    </>
  );
};
