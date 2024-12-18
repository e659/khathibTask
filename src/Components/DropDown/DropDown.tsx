import React, { useState, useEffect, useContext } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./dropdown.scss";
import { FaPlus } from "react-icons/fa6";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clientsContext } from "../Context/ClientsContext.jsx";
export default function DropDown({
  Clients,
  handleRowClick,
  selectedRow,
  setSelectedRow,
}) {
  const { handleFileChange } = useContext(clientsContext);
  const { imagePreview } = useContext(clientsContext);
  const { fileName } = useContext(clientsContext);
  const { setImagePreview } = useContext(clientsContext);
  const navigate = useNavigate();
  // console.log("clients", Clients);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
  // const [fileName, setFileName] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);
  // Set the initial state for the selected radio button
  const [selectedOption, setSelectedOption] = useState("option2");
  // const [selectedImage, setSelectedImage] = useState("");
  // const [image, setImage] = useState(null);
  // const [imageDeleted, setImageDeleted] = useState(false);
  // Handle change when a radio button is selected
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedRow);
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

  // Handle selecting a row to edit (this is called from the Parent)
  const handleRowEdit = (selectedRow) => {
    handleRowClick(selectedRow); // Call the parent onEdit function with the selected row data
    // Formik.setValues({
    //   fristName: row.first_name,
    //   lastName: row.last_name,
    //   email: row.email,
    // });
  };
  // Handle the file input change
  // const handleFileChange = (event, setFieldValue) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const fileType = file.type.split("/")[0];
  //     if (fileType !== "image") {
  //       alert("Please upload a valid image file.");
  //       return;
  //     }

  //     setFileName(file.name);
  //     setImageFile(file);
  //     setFieldValue("image", file);
  //     setSelectedImage(URL.createObjectURL(file));

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // Handle delete image
  // const handleDeleteImage = () => {
  //   setFileName(null); // Clear the selected file
  //   setSelectedImage(""); // Remove the image preview
  //   setImageDeleted(true); // Mark the image as deleted
  // };
  // send data to backend
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();

    // Append other fields (like name, description) to FormData
    formData.append("first_name", values.fristName);
    formData.append("last_name", values.lastName);
    formData.append("image", values.image); // Append the image file
    // if (image || imageDeleted) {
    //   formData.append("image", image || ""); // Send the image file or empty string if deleted
    // }
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
      .patch(`${BASEURL}/client/update_client/${selectedRow.id}`, formData, {
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

    // handel error if request faild
    // .catch((err) => {
    //   console.log(err);
    // });
  };
  // navigate to details
  const navigateToAllDetails = () => {
    // console.log("selectedrow",selectedRow.id);
    navigate(`/Clients/${selectedRow.id}`);
  };
  const deleteImage = () => {
    console.log("null");
  };
  return (
    <div>
      <div className="dropdown Client__dropdown">
        <HiDotsHorizontal
          className=" dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li className="ms-1 cursor-pointer" onClick={navigateToAllDetails}>
            <a className="dropdown-item fw-bold">All Details</a>
          </li>
          <li
            className="ms-1"
            onClick={() => {
              handleShow();
              handleRowEdit(selectedRow);
            }}
          >
            <a className="dropdown-item fw-bold" href="#">
              {/* <FaRegEdit size={20} /> */}
              Edit
            </a>
          </li>

          {selectedRow ? (
            <Formik
              initialValues={{
                fristName: selectedRow.first_name || "",
                lastName: selectedRow.last_name || "",
                email: selectedRow.email || "",
                phone: selectedRow.phone || "",
                address: selectedRow.address || "",
                city: selectedRow.city || "",
                state: selectedRow.state || "",
                zipcode: selectedRow.zip_code || "",
                annualIncome: selectedRow.annual_income || "",
                disabilityYear: selectedRow.disability_year || "",
                birthofdate: selectedRow.birth_date || "",
                disabled: selectedRow.disability || "",
                veteran: selectedRow.Veteran || "",
              }} // Populate the form with selected row data
              enableReinitialize
              onSubmit={handleSubmit}
              // validation
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
                      <Modal.Title
                        style={{ fontWeight: "700", fontSize: "18px" }}
                      >
                        Edit Client
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit} className="row g-3">
                        <p style={{ color: "rgb(128 131 142)" }}>
                          Profile Picture Upload
                        </p>
                        <div className="d-flex">
                          {/* <div>
                            <img
                              src={selectedRow.image}
                              alt="image"
                              className="rounded rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div> */}
                          {imagePreview ? (
                            <div>
                              <img
                                src={imagePreview}
                                alt="image"
                                className="rounded rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </div>
                          ) : (
                            <div>
                              <img
                                src={selectedRow.image}
                                alt="image"
                                className="rounded rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </div>
                          )}
                          <div>
                            <button
                              className="btn "
                              style={{
                                border: "1px solid gray",
                                transform: "translate(130%,-1px)",
                                padding: "13px",
                              }}
                            >
                              Delete
                            </button>
                            {selectedRow.image ? (
                              <>
                                <input
                                  type="file"
                                  id="file-input"
                                  name="image"
                                  accept="image/*" // Restrict to image files only
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    handleFileChange(e, setFieldValue)
                                  }
                                />
                                <label
                                  htmlFor="file-input"
                                  className="custom-file-label"
                                  style={{ transform: "translate(75%,-1px)" }}
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
                                  onChange={(e) =>
                                    handleFileChange(e, setFieldValue)
                                  }
                                />
                                <label
                                  htmlFor="file-input"
                                  className="custom-file-label"
                                  style={{ transform: "translate(75%,-1px)" }}
                                >
                                  Upload Photo
                                </label>
                              </>
                            )}
                            {/* <input
                              type="file"
                              id="file-input"
                              name="image"
                              accept="image/*" // Restrict to image files only
                              style={{ display: "none" }}
                              onChange={(e) =>
                                handleFileChange(e, setFieldValue)
                              }
                            />
                            <label
                              style={{ transform: "translate(75%,-1px)" }}
                              htmlFor="file-input"
                              className="custom-file-label"
                            >
                              {fileName ? fileName : "Upload Photo"}
                            </label> */}
                          </div>
                        </div>

                        {/* clientInfo */}
                        <p className="mt-3">Client Information</p>
                        <div className="col-md-6">
                          <label
                            htmlFor="inputfristname"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputlastemail"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputlastphone"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputlastaddress"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputlaststate"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputlastzipcode"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputdisability"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="inputbirthofdate"
                            className="form-label"
                          >
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
                              <label
                                htmlFor="inputentityName"
                                className="form-label"
                              >
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
                              <label
                                htmlFor="inputrelation"
                                className="form-label"
                              >
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
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </Formik>
          ) : (
            ""
          )}

          <li>
            <a className="dropdown-item fw-bold" href="#">
              {/* <MdDeleteOutline size={25} /> */}
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
