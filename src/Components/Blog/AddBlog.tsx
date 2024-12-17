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
export default function AddBlog() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // change fileStyle
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // To store the preview image
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
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
      setImagePreview(previewUrl); // Set the preview URL to state
      setIsUploaded(true);
      // Generate preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL once loaded
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };
  //   initialValues
  const initialValues = {
    image: null,
    title: "",
    short_description: "",
    description: "",
  };

  // send data to backend
  const handleSubmit = async (values) => {
    console.log(values);
    if (!values.image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();

    // Append other fields (like name, description) to FormData
    formData.append("image", values.image); // Append the image file
    formData.append("title", values.title);
    formData.append("short_description", values.short_description);
    formData.append("description", values.description);

    const response = await axios
      .post(`${BASEURL}/blog/add_blog`, formData, {
        headers: {
          authorization: localStorage.getItem("usertoken"),
        },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    console.log("res", response);
  };

  return (
    <>
      {/* Button trigger modal  */}
      <button
        type="button"
        className="btn btn-primary add__ClientBtn px-4 me-2 text-center rounded rounded-1 py-2 add__newBlog_btn"
        onClick={handleShow}
      >
        <FaPlus className="ms-1 me-1" />
        Add New Blog
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton> Add New Blog</Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                  {/* <div className="blog_custom_file">
                   
                      <>
                        <input
                          type="file"
                          id="file-input"
                          name="image"
                          accept="image/*" // Restrict to image files only
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                        <div className="d-flex justify-content-center align-items-center">
                          <label
                            htmlFor="file-input"
                            className="Blog__uploadImgLabel"
                          >
                            Upload Photo
                          </label>
                        </div>
                      </>
                  
                
                  </div> */}
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
                      <label htmlFor="floatingTextarea1" className="form-label">
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
                      <label htmlFor="floatingTextarea2" className="form-label">
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
                  <Button className="blog_cancelBtn mt-2" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    className="mx-3 mt-2"
                    type="submit"
                    variant="primary"
                    onClick={handleClose}
                  >
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        )}
      </Formik>
    </>
  );
}
