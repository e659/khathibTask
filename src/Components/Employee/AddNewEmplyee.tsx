import React, { useState, useEffect, useContext } from "react";
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
import { userContext } from "../Context/userContext.jsx";
import { clientsContext } from "../Context/ClientsContext.jsx";
export default function AddNewEmplyee(permision) {
  // console.log(permision);
  const { handleFileChange } = useContext(clientsContext);
  const { imagePreview } = useContext(clientsContext);
  const group_permission = JSON.parse(localStorage.getItem("user"));
  // console.log(group_permission.group_permission.id);
  // modal functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
 
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
    role: "",
    start_date: "",
    group_permission_id: group_permission.group_permission.id,
  };
  //  validation using yup
  const AddClientSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

 
  // send data to backend
  const handleSubmit = async (values) => {
    if (!values.image) {
      alert("Please select an image.");
      return;
    }
    console.log(values);
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
    // formData.append("role", values.role);
    formData.append("start_date", values.start_date);
    formData.append("group_permission_id", values.group_permission_id);
    const response = await axios
      .post(`${BASEURL}/admin/add_admin`, formData, {
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
      <div>
        {/* Button trigger modal  */}
        <button
          type="button"
          className="btn btn-primary add__ClientBtn px-4 me-2 text-center rounded rounded-1 py-2"
          onClick={handleShow}
        >
          <FaPlus className="ms-1 me-1" />
          Add New Employee
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
                    Add New Employee
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
                    <p className="mt-3">Employee Information</p>
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
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                      <label htmlFor="inputstart_date" className="form-label">
                        start_date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputstart_date"
                        name="start_date"
                        value={values.start_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
                    <div className="col-md-6">
                      <label
                        htmlFor="inputlastuserPermision"
                        className="form-label"
                      >
                        User Permission
                      </label>
                      <select
                        id="inputlastuserPermision"
                        className="form-select"
                        name="role"
                        defaultValue={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value=""></option>
                        {permision?.permission?.map((per) => {
                          return (
                            <option key={per.id} value={per.id}>
                              {per.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

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
                        Save Employee
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
