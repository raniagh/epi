/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * HTML code related to profile page .
    * functions for retrieving and updating student informations.
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import ReactDatetime from "react-datetime";

import { civiliteOptions } from "dictionary/profileCivilite.js";
import userImage from "../../Assets/img/icons/user_image.png";
import moment from "moment";
import Button from "components/UI/Button";
import { getStudentAsync } from "Services/ProfileServices";
import { changeStudentDataAsync } from "Services/ProfileServices";
import "./Profile.css";
import { FaUserEdit } from "react-icons/fa";
import { uploadFile } from "Services/Utilities";
import LoadingSpinner from "components/UI/LoadingSpinner";

export const Profile = () => {
  const [studentData, setStudentData] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(userImage);
  const [actuallyImage, setActuallyImage] = useState(userImage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const etudiantValue = "dafacb37-e240-ee11-be6e-002248c9366d";

  // Create initial state to store the initial data

  useEffect(() => {
    (async () => {
      var data = await getStudentAsync(etudiantValue);
      setStudentData(data);
      // Set the selected date from studentData (if available)
      if (data?.birthdate) {
        setSelectedDate(moment(data.birthdate));
      }
      setActuallyImage(userImage);
      // Initialize form data here after fetching student data
      setFormData({
        zs_civilite: data?.zs_civilite || 1,
        firstname: data?.firstname || "",
        lastname: data?.lastname || "",
        birthdate: data?.birthdate
          ? moment(data.birthdate).format("YYYY-MM-DD")
          : "", // Format the birthdate
        emailaddress1: data?.emailaddress1 || "",
        zs_npaetlieu: data?.zs_npaetlieu || "",
        zs_rueetn: data?.zs_rueetn || "",
        mobilephone: data?.mobilephone || "",
      });
      setIsLoading(false);
      setError("");
    })();
  }, []);
  /*TODO*/
  /* useEffect(() => {
    const fetchImagePath = async () => {
      const image = await downloadFile();
      //other parameters
      if(selectedImage){
        setSelectedImage(image);
        setActuallyImage(image)
      } 
    };
    fetchImagePath();
  }, []);
 */

  // State to track input changes
  const [formData, setFormData] = useState({
    zs_civilite: studentData?.zs_civilite || 1,
    firstname: studentData?.firstname || "",
    lastname: studentData?.lastname || "",
    birthdate: selectedDate || null,
    emailaddress1: studentData?.emailaddress1 || "",
    zs_npaetlieu: studentData?.zs_npaetlieu || "",
    zs_rueetn: studentData?.zs_rueetn || "",
    mobilephone: studentData?.mobilephone || "",
  });
  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "birthdate") {
      // Convert the selected date to the desired format
      const formattedDate = moment(value).format("YYYY-MM-DD");

      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = async () => {
    // Call the changeProfileData function with studentData.contactId and formData
    try {
      setIsLoading(true);
      await changeStudentDataAsync(studentData.contactid, formData);
      if (actuallyImage !== selectedImage) {
        await uploadFile(
          /*TODO*/
          // exercice.zs_exercice_etudiantid,
          //"Exercice par étudiant",
          selectedImage.name,
          selectedImage
          //"Rendus"
        );
      }
      toast.success("Profil modifié avec succés !");
      setIsLoading(false);
    } catch (error) {
      toast.error("Erreur de modification");
    }
  };

  const handleCancel = () => {
    // Reset form data to initial values
    setFormData({
      zs_civilite: studentData?.zs_civilite || 1,
      firstname: studentData?.firstname || "",
      lastname: studentData?.lastname || "",
      birthdate: selectedDate || null,
      emailaddress1: studentData?.emailaddress1 || "",
      zs_npaetlieu: studentData?.zs_npaetlieu || "",
      zs_rueetn: studentData?.zs_rueetn || "",
      mobilephone: studentData?.mobilephone || "",
    });

    // Reset selected date if available
    if (selectedDate) {
      setSelectedDate(moment(selectedDate));
    }
  };

  //Handle image change
  const onImageChange = (e) => {
    e.preventDefault();
    // Update the state
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    e.currentTarget.value = null;
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
      <Container className="mt--7" fluid style={{ paddingTop: "6.8rem" }}>
        <div className="swisswai-table-title">Profile</div>
        <Row>
          <Col className="order-xl-2 mb-8 mb-xl-0" xl="12">
            <Card
              className="card-profile"
              style={{
                marginTop: "20px",
                backgroundColor: "transparent",
                borderRadius: "30px 30px 30px 30px",
              }}
            >
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={selectedImage}
                      style={{ width: "6rem" }}
                    />
                    <div className="middle">
                      <div className="image-upload">
                        <label htmlFor={`file-input`}>
                          <FaUserEdit size={20} style={{ cursor: "pointer" }} />
                        </label>
                        <input
                          id={`file-input`}
                          type="file"
                          onChange={(e) => onImageChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <CardBody style={{ marginTop: "5rem", paddingTop: 0 }}>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Civilité
                          </label>
                          <Input
                            type="select"
                            id="select-status"
                            name="zs_civilite"
                            value={formData.zs_civilite}
                            onChange={handleInputChange}
                          >
                            {Object.entries(civiliteOptions).map(
                              ([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Date de naissance
                          </label>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Date de naissance",
                                }}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
                                value={
                                  selectedDate
                                    ? selectedDate.format("YYYY-MM-DD")
                                    : ""
                                }
                                onChange={(date) => {
                                  setSelectedDate(date);
                                  handleInputChange({
                                    target: { name: "birthdate", value: date },
                                  });
                                }}
                              />
                            </InputGroup>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            E-mail
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="email"
                            name="emailaddress1"
                            value={formData.emailaddress1}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-telephone"
                          >
                            Téléphone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-telephone"
                            placeholder="Téléphone"
                            type="text"
                            name="mobilephone"
                            value={formData.mobilephone}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Rue et n°
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="Rue et n°"
                            name="zs_rueetn"
                            value={formData.zs_rueetn}
                            onChange={handleInputChange}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            NPA et lieu
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="NPA et lieu"
                            type="text"
                            name="zs_npaetlieu"
                            value={formData.zs_npaetlieu}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    className="button-group"
                    style={{
                      width: "40%",
                    }}
                  >
                    <Button
                      buttonText="Annuler"
                      buttonClass="cancel-button"
                      handleClick={handleCancel}
                    />
                    <Button
                      buttonText="Enregistrer"
                      buttonClass="save-button"
                      handleClick={handleUpdateProfile}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
