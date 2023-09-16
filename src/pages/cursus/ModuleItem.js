/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to only one module item.
* Manage the state of a module.
* Calling function for downloading module file.
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { downloadFile } from "Services/Utilities";
import DownloadIcon from "../../Assets/img/icons/Download_icon.png";

const ModuleItem = ({ module }) => {
  const [supportPath, setSupportPath] = useState("");

  useEffect(() => {
    const fetchDocPath = async () => {
      const support = await downloadFile(
        "Module",
        module?.zs_moduleid?.zs_moduleid
      );
      support && setSupportPath(support);
    };
    fetchDocPath();
  }, [module?.zs_moduleid?.zs_moduleid]);

  return (
    <TableRow>
      <TableCell>{module?.zs_moduleid?.zs_name}</TableCell>
      <TableCell align="center">
        {supportPath ? (
          <Link to={supportPath} download>
            <img src={DownloadIcon} alt="" />
          </Link>
        ) : (
          <div> - </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ModuleItem;
