import React, { useState, useEffect, useContext } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";
import { clientsContext } from "../Context/ClientsContext.jsx";
export default function DropDown({
  Workers,
  handleCardClick,
  selectedCard,
  setSelectedCard,
}) {
  // console.log(selectedCard);
  const { handleFileChange } = useContext(clientsContext);
  const { imagePreview } = useContext(clientsContext);
  const { fileName } = useContext(clientsContext);
  const { setImagePreview } = useContext(clientsContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Set the initial state for the selected radio button
  const [selectedOption, setSelectedOption] = useState("option2");


  // Handle selecting a row to edit (this is called from the Parent)
  const handleCardEdit = (row) => {
    handleCardClick(row);

    // Formik.setValues({
    //   fristName: row.first_name,
    //   lastName: row.last_name,
    //   email: row.email,
    // });
  };
  // send data to backend
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    if (!values.image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();

    formData.append("first_name", values.fristName);
    formData.append("last_name", values.lastName);
    formData.append("image", values.image); // Append the image file
    formData.append("job_title", values.job_title);
    formData.append("description", values.description);

    const response = await axios
      .patch(`${BASEURL}/worker/update_worker/${selectedCard.id}`, formData, {
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
      <HiOutlineDotsVertical
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
            handleCardEdit(selectedCard);
          }}
        >
          <a className="dropdown-item fw-bold" href="#">
            {/* <FaRegEdit size={20} /> */}
            Edit
          </a>
        </li>

        {selectedCard ? (
          <Formik
            initialValues={{
              image: selectedCard.image || "",
              fristName: selectedCard.first_name || "",
              lastName: selectedCard.last_name || "",
              job_title: selectedCard.job_title || "",
              description: selectedCard.description || "",
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
                      Edit Worker
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
                                src={selectedCard.image}
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
                            {selectedCard.image ? (
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
  );
}
