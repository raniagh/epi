/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to cursus page .
* functions for retrieving and searching student cursus.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";

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
import CursusItem from "./CursusItem";
import { pagination } from "Services/Utilities";
import TableTitle from "../../components/sections/TableTitle";
import { formatDate } from "dataConverter/DateUtils";
import { getStudentCursusAsync } from "Services/CursusServices";

export const Cursus = () => {
  const [cursusData, setCursusData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  //Pagination
  const { nbPage, dataPerPage } = pagination(filteredData, current);
  const HandleChange = (event, page) => {
    setCurrent(page);
  };

  useEffect(() => {
    (async () => {
      var data = await getStudentCursusAsync(etudiantValue);
      setCursusData(data.value);
      setFilteredData(data.value);
    })();
  }, []);

  //Search
  const HandleSearch = (e) => {
    const searchedValue = e.target.value;
    const data = [...cursusData];
    const filteredRows = data.filter((row) => {
      return (
        row.zs_Cursus.zs_name
          .toLowerCase()
          .includes(searchedValue.toLowerCase()) ||
        formatDate(row.zs_Cursus.zs_datedebut).includes(searchedValue)
      );
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
            <TableTitle title="Cursus" handleClick={HandleSearch} />
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "#edecf5",
                    }}
                  >
                    <TableCell style={{ borderRadius: "3em 0 0 3em" }} />
                    <TableCell align="left">Cursus</TableCell>

                    <TableCell
                      align="center"
                      style={{ borderRadius: "0 3em 3em 0" }}
                    >
                      Date début
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPerPage.map((cursus) => (
                    <CursusItem
                      cursus={cursus}
                      key={cursus.zs_etudiant_cursusid}
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
