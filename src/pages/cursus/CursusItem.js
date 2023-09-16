/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to only one cursus item.
* Manage the state of a cursus.
* Calling function for fetching cursus modules
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import {
  Table,
  Box,
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatDate } from "dataConverter/DateUtils.js";

import ModuleItem from "./ModuleItem";
import { getCourseModuleAsync } from "Services/CursusServices";

const CursusItem = ({ cursus }) => {
  const [moduleData, setModuleData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchModules = async () => {
    try {
      setOpen(!open);
      var data = await getCourseModuleAsync(
        cursus.zs_Cursus.zs_Cours.zs_coursid
      );
      setModuleData(data.value);
    } catch (error) {}
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={fetchModules}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{cursus.zs_Cursus.zs_name}</TableCell>
        <TableCell align="center">
          {formatDate(cursus.zs_Cursus.zs_datedebut)}
        </TableCell>
      </TableRow>
      {moduleData && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Modules
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#edecf5",
                      }}
                    >
                      <TableCell style={{ borderRadius: "3em 0 0 3em" }}>
                        Module
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderRadius: "0 3em 3em 0" }}
                      >
                        Support de cours
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {moduleData.map((module) => (
                      <ModuleItem
                        key={module?.zs_moduleid?.zs_moduleid}
                        module={module}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CursusItem;
