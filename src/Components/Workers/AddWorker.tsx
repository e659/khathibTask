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
export default function AddWorker() {
  // modal functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // To store the preview image
  const [imagePreview, setImagePreview] = useState(null); // To store the preview image
  // inputsData
  const initialValues = {
    image: null,
    fristName: "",
    lastName: "",
    job_title: "",
    description: "",
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
    console.log(values);
    const formData = new FormData();

    formData.append("first_name", values.fristName);
    formData.append("last_name", values.lastName);
    formData.append("image", values.image); // Append the image file
    formData.append("job_title", values.job_title);
    formData.append("description", values.description);
    const response = await axios
      .post(`${BASEURL}/worker/add_worker`, formData, {
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
          Add New Worker
        </button>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                    Add New Worker
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
                    <p className="mt-3">Worker Information</p>
                    <div className="col-md-12">
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

                    <div className="col-md-12">
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
                    <div className="col-md-12">
                      <label htmlFor="inputlastemail" className="form-label">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputlastemail"
                        name="job_title"
                        value={values.job_title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="inputlastphone" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputlastphone"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
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
                        Save Worker
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
