import React, { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";

export default function DropDown({
  Blogs,
  handleCardClick,
  selectedCard,
  setSelectedCard,
}) {
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
  // Handle the file input change
  const handleFileChange = (event) => {
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
  // Handle selecting a row to edit (this is called from the Parent)
  const handleCardEdit = (selectedCard) => {
    handleCardClick(selectedCard);

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
    formData.append("image", values.image); // Append the image file
    formData.append("title", values.title);
    formData.append("short_description", values.short_description);
    formData.append("description", values.description);
    const response = await axios
      .patch(`${BASEURL}/blog/update_blog/${selectedCard.id}`, formData, {
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
    <div className="blog__dropdownContainer">
      <HiOutlineDotsVertical
        className=" dropdown-toggle blog_dropDown"
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
              title: selectedCard.title || "",
              short_description: selectedCard.short_description || "",
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
                      Edit Blog
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
                            src={selectedCard.image}
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
                            onChange={(e) => handleFileChange(e)}
                          />
                          <label
                            htmlFor="file-input"
                            className="custom-file-label"
                          >
                            {fileName ? fileName : "Upload Photo"}
                          </label>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="inputtittle" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputtittle"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="col-md-12 py-3">
                          <label
                            htmlFor="floatingTextarea1"
                            className="form-label"
                          >
                            Short description
                          </label>
                          <textarea
                            name="short_description"
                            value={values.short_description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                            placeholder="Enter description"
                            id="floatingTextarea1"
                          ></textarea>
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="floatingTextarea2"
                            className="form-label"
                          >
                            description
                          </label>
                          <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={5}
                            className="form-control"
                            placeholder="Enter description"
                            id="floatingTextarea2"
                          ></textarea>
                        </div>
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
          <a className="dropdown-item fw-bold" href="#" style={{
            color:"red"
          }}>
            {/* <MdDeleteOutline size={25} /> */}
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}
