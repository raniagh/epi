/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * HTML code related to invoice page .
    * functions for retrieving and searching student invoices.
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import FactureItem from "./FactureItem";
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
import { pagination } from "Services/Utilities";
import TableTitle from "../../components/sections/TableTitle";
import { formatDate } from "dataConverter/DateUtils";
import { getFacturesAsnyc } from "Services/FactureServices";
import LoadingSpinner from "components/UI/LoadingSpinner";

export const Facture = () => {
  const [factureData, setFactureData] = useState([]);
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
    (async () => {
      var data = await getFacturesAsnyc(etudiantValue);
      setFactureData(data.value);
      setFilteredData(data.value);
      setIsLoading(false);
      setError("");
    })();
  }, []);

  //Search
  const HandleSearch = (e) => {
    const searchedValue = e.target.value;
    const data = [...factureData];
    const filteredRows = data.filter((row) => {
      return (
        row.zs_name.toLowerCase().includes(searchedValue.toLowerCase()) ||
        formatDate(row.zs_date_facture).includes(searchedValue)
      );
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
        <Row className="main-content_row">
          <div className="col">
            <TableTitle title="Factures" handleClick={HandleSearch} />
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
                      Facture
                    </TableCell>
                    <TableCell align="center">Date</TableCell>

                    <TableCell
                      align="center"
                      style={{ borderRadius: "0 3em 3em 0" }}
                    >
                      Document
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPerPage.map((facture) => (
                    <FactureItem facture={facture} key={facture.zs_factureid} />
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
