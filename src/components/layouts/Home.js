/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to Admin pages layout  .
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import UserHeader from "components/sections/UserHeader";
import Communication from "pages/communication/Communication";
import Loading from "pages/Loading/Loading";
import {
  getAuthorizationCode,
  getAccessTokenB2CAsync,
  getUserInformationAsync,
  getTokenAsync,
} from "Services/AuthentificationServices";
import { getSharePointTokenAsync } from "Services/SharePointServices";
import { routes } from "Routes";

const Home = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true); // Add loading state for main content
  //used for display or not the communication part for small devices
  const [showCommunication, setShowCommunication] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, i) => {
      if (prop.layout === "/home") {
        return (
          <Route path={prop.path} element={prop.component} key={i} exact />
        );
      } else {
        return null;
      }
    });
  };

  /**
   * Fetching and storing user information from B2C authentication.
   * This effect runs once when the component mounts. It retrieves the B2C access token,
   * fetches user information, and stores it in the browser's local storage.
   */
  useEffect(() => {
    var fetchDataAsync = async () => {
      // Fetch the token asynchronously
      const token = await getTokenAsync();
      localStorage.setItem("token", token);
      var authorizationCode = getAuthorizationCode(location);
      if (!authorizationCode) {
        setIsLoading(false);
        return;
      }
      var accessTokenB2C = await getAccessTokenB2CAsync(authorizationCode);
      var userInfo = await getUserInformationAsync(accessTokenB2C);
      localStorage.setItem("userInformation", JSON.stringify(userInfo));

      //localStorage.setItem("token", token);
      setIsLoading(false);
    };

    var fetchSharePointTokenAsync = async () => {
      try {
        const sharePointToken = await getSharePointTokenAsync();
        // Store or use the access token
        localStorage.setItem("SharePointToken", sharePointToken);
      } catch (error) {}
    };

    fetchDataAsync();
    fetchSharePointTokenAsync();
  }, [location]);

  var userInformation = JSON.parse(localStorage.getItem("userInformation")); // Get user information from localStorage
  let content;
  // Only render the logo while loading and when userInformation is not yet set
  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <>
        <Container fluid className="main">
          <Row className="main-row">
            <Col md="2" className="sidebar-col">
              <Sidebar
                routes={routes}
                handleCommunication={() =>
                  setShowCommunication((previousState) => !previousState)
                }
              />
            </Col>
            {!showCommunication && (
              <Col xs="12" md="7" className="main-content-col">
                {location.pathname === "/home/dashboard" && (
                  <Row className="header-row">
                    <Col style={{ paddingLeft: 0 }}>
                      {userInformation && (
                        <UserHeader userInformation={userInformation} />
                      )}
                    </Col>
                  </Row>
                )}
                {location.pathname !== "/home/dashboard" && (
                  <Row className="header-row" style={{ height: "2rem" }}></Row>
                )}

                {/*Main content*/}
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="*"
                    element={<Navigate to="/home/dashboard" replace />}
                  />
                </Routes>
              </Col>
            )}
            {showCommunication && (
              <Col
                xs="12"
                md="7"
                className="main-content-col"
                style={{ marginTop: "-4.5rem" }}
              >
                <Communication />
              </Col>
            )}
            <Col xs="12" md="3" className="communication-small">
              <Communication />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return content;
};

export default Home;
