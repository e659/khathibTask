import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";
import { useNavigate } from "react-router-dom";
export default function DropDown({
  Employees,
  handleRowClick,
  selectedRow,
  setSelectedRow,
  permision,
}) {
  // console.log(permision);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // To store the preview image
  // Set the initial state for the selected radio button
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selectedImage, setSelectedImage] = useState("");
  const [image, setImage] = useState(null); // To store the selected image file
  const [imageDeleted, setImageDeleted] = useState(false);
  const group_permission = JSON.parse(localStorage.getItem("user"));
  const group_permission_id=parseInt(group_permission.group_permission.id);
   console.log(group_permission_id);
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
    group_permission_id: group_permission_id,
  };
  // Handle selecting a row to edit (this is called from the Parent)
  const handleRowEdit = (row) => {
    handleRowClick(row);
    console.log(row);
    // Formik.setValues({
    //   fristName: row.first_name,
    //   lastName: row.last_name,
    //   email: row.email,
    // });
  };
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
      setSelectedImage(URL.createObjectURL(file)); // Preview the image
      // setImageDeleted(false); // Reset the image deleted flag
      // Generate preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL once loaded
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };
  // send data to backend
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values)
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
    // formData.append("role", values.role);
    formData.append("start_date", values.start_date);
    formData.append("group_permission_id", values.group_permission_id);

    const response = await axios
      .patch(`${BASEURL}/admin/update_admin/${selectedRow.id}`, formData, {
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
          {/* <li className="ms-1 cursor-pointer" onClick={navigateToAllDetails}>
            <a className="dropdown-item fw-bold">All Details</a>
          </li> */}
          <li
            className="ms-1"
            onClick={() => {
              handleShow();
              handleRowEdit(row);
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
                address:selectedRow.address||"",
                city:selectedRow.city||"",
                start_date:selectedRow.start_date||"",
                state:selectedRow.state||"",
                zipcode:selectedRow.zip_code||"",
                role:selectedRow.role||"",
                group_permission_id:group_permission_id||"",
              }}
              // initialValues={selectedRow} // Populate the form with selected row data
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
                        Edit  Employee
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit} className="row g-3">
                        <p style={{ color: "rgb(128 131 142)" }}>
                          Profile Picture Upload
                        </p>
                        <div className="d-flex">
                          <div>
                            <img
                              src={selectedRow.image}
                              alt="image"
                              className="rounded rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <div>
                            <button
                              className="btn "
                              style={{
                                border: "1px solid gray",
                                transform: "translate(130%,-1px)",
                                padding: "10px",
                              }}
                            >
                              Delete
                            </button>
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
                            >
                              {fileName ? fileName : "Upload Photo"}
                            </label>
                          </div>
                        </div>

                        {/* clientInfo */}
                        <p className="mt-3">Employee Information</p>
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
                          <label
                            htmlFor="inputstart_date"
                            className="form-label"
                          >
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
                        <div className="col-md-3">
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
                            <option defaultValue="admin">admin</option>
                            <option defaultValue="youssef's permissions">youssef's permissions</option>
                            {/* {permision?.permission?.map((per) => {
                              console.log(per)
                              return (
                                <option key={per.id} value={per.id}>
                                  {per.name}
                                </option>
                              );
                            })} */}
                          </select>
                        </div>
                        {/* <div className="col-md-6" style={{display:"none"}}>
                          <label htmlFor="inputstart_date" className="form-label">
                           start Date
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputlastcity"
                            name="start_date"
                            value={values.start_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="col-md-6" style={{display:"none"}}>
                          <label htmlFor="inputpgroup" className="form-label">
                           start Date
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputpgroup"
                            name="group_permission_id"
                            value={values.group_permission_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div> */}
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
