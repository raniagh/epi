/*

=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to User header component.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import NotificationBar from "./NotificationBar";

const UserHeader = ({ userInformation }) => {
  let parsedUserInformation = userInformation;
  if (typeof userInformation === "string") {
    parsedUserInformation = JSON.parse(userInformation);
  }

  return (
    <>
      {/* Header container */}
      <Container className=" align-items-center" fluid>
        <Col
          lg="12"
          md="12"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="swisswai-table-title">
            Bonjour {parsedUserInformation.name}
          </div>
        </Col>

        {/* Card stats */}
        <Row>
          <Col lg="12" xl="12" className="notification-bar">
            <NotificationBar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserHeader;
