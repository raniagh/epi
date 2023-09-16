/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to only one invoice item.
* Manage the state of an invoice.
* Calling function downloading invoice file.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "dataConverter/DateUtils";
import { downloadFile } from "Services/Utilities";
import DownloadIcon from "../../Assets/img/icons/Download_icon.png";
import { TableCell, TableRow } from "@mui/material";

const FactureItem = ({ facture }) => {
  const [docPath, setDocPath] = useState("");
  useEffect(() => {
    const fetchDocPath = async () => {
      const path = await downloadFile("Facture", facture.zs_factureid);
      setDocPath(path);
    };
    fetchDocPath();
  }, [facture.zs_factureid]);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="left">{facture.zs_name}</TableCell>
      <TableCell align="center">
        {formatDate(facture.zs_date_facture)}
      </TableCell>
      <TableCell align="center">
        <Link to={docPath} download>
          <img src={DownloadIcon} alt="" />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default FactureItem;
