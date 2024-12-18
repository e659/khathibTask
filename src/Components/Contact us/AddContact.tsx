import React, { useState, useEffect, useContext } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { BASEURL } from "../../../constans/index.js";
import "./contact.scss";
export default function AddContact({
  handleRowClick,
  selectedRow,
  setSelectedRow,
}) {
  // modal functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Handle selecting a row to edit (this is called from the Parent)
  console.log(selectedRow);
  // inputsData
  const initialValues = {
    subject: "",
    reply: "",
    contact_us_id: selectedRow?.id,
  };
  // send data to backend
  const handleSubmit = async (values) => {
    // Prepare the HTML content
    const htmlContent = `

   <!DOCTYPE html>
     <html>
     <head>
         <meta charset="UTF-8">
            <title>Contact Us Reply</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                 <p>${values.reply}</p>
                    
                </body>
                </html>
    `;
    values.reply = htmlContent;
    // console.log(values);
    const response = await axios
      .post(`${BASEURL}/contact_us_reply/add_contact_us_reply`, values, {
        headers: {
          authorization: localStorage.getItem("usertoken"),
          "Content-Type": "text/html", // Specify that you are sending HTML
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
          className="btn add_contactBtn px-4 me-2 text-center rounded rounded-1 py-2"
          onClick={handleShow}
        >
          View
        </button>
        {selectedRow ? (
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
                    <Modal.Title
                      style={{ fontWeight: "700", fontSize: "18px" }}
                    >
                      Add New Contact
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit} className="row g-3">
                      <p>{selectedRow.full_name}</p>
                      <p>From:{selectedRow.email}</p>
                      <p>{selectedRow.subject}</p>
                      <p>{selectedRow.contact_us_replies[1].subject}</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedRow?.contact_us_replies[0].reply,
                        }}
                      />
                      <div className="col-md-12">
                        <label htmlFor="inputfristname" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputfristname"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="inputlastname" className="form-label">
                          Replay
                        </label>
                        <textarea
                          rows={5}
                          className="form-control"
                          id="floatingTextarea"
                          name="reply"
                          value={values.reply}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        {/* <input
                      type="text"
                      className="form-control"
                      id="inputlastname"
                      name="reply"
                      value={values.reply}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    /> */}
                      </div>

                      <Modal.Footer className="d-flex justify-content-start">
                        <Button
                          type="reset"
                          className="addClient____delBtn px-4"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleClose}
                          type="submit"
                          className="px-5"
                          variant="primary"
                        >
                          Add Reply
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
      </div>
    </div>
  );
}
