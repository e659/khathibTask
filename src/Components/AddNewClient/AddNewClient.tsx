import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./addclient.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";
import { BsPerson } from "react-icons/bs";
export default function AddNewClient() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // To store the preview image
  const [imagePreview, setImagePreview] = useState(null); // To store the preview image
  // Set the initial state for the selected radio button
  const [selectedOption, setSelectedOption] = useState("option2");
  // Handle change when a radio button is selected
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // inputsData
  const initialValues = {
    image: null,
    email: "",
    fristName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    annualIncome: "",
    disabilityYear: "",
    birthofdate: "",
    disabled: "",
    veteran: "",
    entityname: "",
    relationship: "",
    entitytype: "",
  };
  //  validation using yup
  const AddClientSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  // Handle the file input change
  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type.split("/")[0]; // Check if file is an image
      if (fileType !== "image") {
        alert("Please upload a valid image file.");
        return;
      }

      setFileName(file.name); // Update file name for display
      setImageFile(file); // Set the image file
      setFieldValue("image", file); // Set file in Formik's state
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Generate preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL once loaded
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };
  // send data to backend
  const handleSubmit = async (values) => {
    if (!values.image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();

    // Append other fields (like name, description) to FormData
    formData.append("first_name", values.fristName);
    formData.append("last_name", values.lastName);
    formData.append("image", values.image); // Append the image file
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("zip_code", values.zipcode);
    // formData.append("annualIncom", values.annualIncome);
    formData.append("disability", values.disabilityYear);
    // formData.append("birthofdate", values.birthofdate);
    // formData.append("disable", values.disabled);
    formData.append("Veteran", values.veteran);

    const response = await axios
      .post(`${BASEURL}/client/add_client`, formData, {
        headers: {
          authorization: localStorage.getItem("usertoken"),
          "Content-Type": "multipart/form-data",
        },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    console.log("res", response);
  };

  return (
    <div>
      {/* Button trigger modal  */}
      <button
        type="button"
        className="btn btn-primary add__ClientBtn px-4 me-2 text-center rounded rounded-1 py-2"
        onClick={handleShow}
      >
        <FaPlus className="ms-1 me-1" />
        Add New Client
      </button>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validation

        validationSchema={AddClientSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          /* and other goodies */
        }) => (
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              className="addClient___model"
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: "700", fontSize: "18px" }}>
                  Add New Client
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit} className="row g-3">
                  <p style={{ color: "rgb(128 131 142)" }}>
                    Profile Picture Upload
                  </p>
                  <div className="d-flex">
                    {imagePreview ? (
                      <div>
                        <img
                          className="rounded rounded-circle"
                          src={imagePreview}
                          alt="Selected Preview"
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        />
                      </div>
                    ) : (
                      <BsPerson size={70} className="me-5" />
                    )}
                    {imagePreview ? (
                      <>
                        <input
                          type="file"
                          id="file-input"
                          name="image"
                          accept="image/*" // Restrict to image files only
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                        <label
                          htmlFor="file-input"
                          className="custom-file-label"
                        >
                          Change Photo
                        </label>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="file-input"
                          name="image"
                          accept="image/*" // Restrict to image files only
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                        <label
                          htmlFor="file-input"
                          className="custom-file-label"
                        >
                          Upload Photo
                        </label>
                      </>
                    )}
                  </div>

                  {/* clientInfo */}
                  <p className="mt-3">Client Information</p>
                  <div className="col-md-6">
                    <label htmlFor="inputfristname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputfristname"
                      name="fristName"
                      value={values.fristName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputlastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlastname"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputlastemail" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputlastemail"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <Col md={12} className="validationBox mt-2 p-2 ms-3">
                      {errors.email}
                    </Col>
                  ) : null}
                  <div className="col-md-6">
                    <label htmlFor="inputlastphone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlastphone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* address */}
                  <p>Address</p>
                  <div className="col-md-6">
                    <label htmlFor="inputlastaddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlastaddress"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputlastcity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlastcity"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputlaststate" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlaststate"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputlastzipcode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputlastzipcode"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="inputlastdate" className="form-label">
                      Added Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputlastdate"
                      name="addeddate"
                      value={values.addeddate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div> */}
                  <p>Info</p>
                  <div className="col-md-6">
                    <label htmlFor="inputcome" className="form-label">
                      Annual Income
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputcome"
                      name="annualIncome"
                      value={values.annualIncome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="$0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputdisability" className="form-label">
                      Disability Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputdisability"
                      name="disabilityYear"
                      value={values.disabilityYear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputbirthofdate" className="form-label">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputbirthofdate"
                      name="birthofdate"
                      value={values.birthofdate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputdisable" className="form-label">
                      Disabled
                    </label>
                    <select
                      id="inputdisable"
                      className="form-select"
                      name="disabled"
                      defaultValue={values.disabled}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option defaultValue="false">false</option>
                      <option defaultValue="true">true</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputveteran" className="form-label">
                      Veteran
                    </label>
                    <select
                      id="inputveteran"
                      className="form-select"
                      name="veteran"
                      defaultValue={values.veteran}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option defaultValue="false">false</option>
                      <option defaultValue="true">true</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Entity</p>
                    <div className="d-flex">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="option1"
                          name="layout"
                          value="option1"
                          checked={selectedOption === "option1"}
                          onChange={handleRadioChange}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label fw-bold"
                          for="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check ms-3">
                        <input
                          type="radio"
                          id="option2"
                          name="layout"
                          value="option2"
                          checked={selectedOption === "option2"}
                          onChange={handleRadioChange}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label fw-bold"
                          for="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* extra input */}
                  {selectedOption === "option1" ? (
                    <>
                      <div className="col-md-4">
                        <label htmlFor="inputentityName" className="form-label">
                          Entity Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputentityName"
                          name="entityname"
                          value={values.entityname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputrelation" className="form-label">
                          Relation Ship
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputrelation"
                          name="relationship"
                          value={values.relationship}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label
                            htmlFor="inputentitytype"
                            className="form-label"
                          >
                            Entity Type
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputentitytype"
                            name="entitytype"
                            value={values.entitytype}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <Modal.Footer className="d-flex justify-content-start">
                    {/* <Button type="reset" className="addClient____delBtn px-4">
                      Delete
                    </Button> */}
                    <Button
                      onClick={handleClose}
                      type="submit"
                      className="px-5"
                      variant="primary"
                    >
                      Save Client
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </Formik>
    </div>
  );
}
