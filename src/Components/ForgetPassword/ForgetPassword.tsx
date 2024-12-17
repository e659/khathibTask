import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AuthRightSide from "../AuthRightSide/AuthRightSide.js";
import "./forgetPass.scss";
import { useNavigate } from "react-router-dom";
import {BASEURL} from "../../../constans/index.js"
import AuthHeader from "../AuthHeader/AuthHeader.js";
export default function ForgetPassword() {
  const navigate = useNavigate();
  // const baseUrl:string = "https://khatib-law-v1-3185dfe428a5.herokuapp.com";
  //  validation using yup
  const forgetPassSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  // navigateTo verifyCode
  const navigateToVerifyCode = () => {
    navigate("/VerificationCode");
  };
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          email: "",
        }}
        // validation
        validationSchema={forgetPassSchema}
        // send data to backend
        onSubmit={async (values) => {
          const { data }:object = await axios
            .post(`${BASEURL}/admin/admin_forget_password`, values)
            // handel error if request faild
            .catch((err) => {
              console.log(err);
            });
          console.log(data);
          if (data.success === true) {
            // navigateTo verifyCode
            navigateToVerifyCode();
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          /* and other goodies */
        }) => (
          <div className="container h-100 ">
          <AuthHeader/>
            <Row className="w-75 login___row">
              <Col md={6} className="left__side">
                <Form onSubmit={handleSubmit} className="mt-4">
                  <Row className="mb-4" position-relative>
                    <Form.Group controlId="formGridEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                    {errors.email && touched.email ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.email}
                      </Col>
                    ) : null}
                  </Row>

                  <Row className="mt-4 ms-2 cursor-pointer">
                    <Button className="w-25" type="submit">
                      Reset
                    </Button>
                  </Row>
                </Form>
              </Col>
              <AuthRightSide />
            </Row>
          </div>
        )}
      </Formik>
    </>
  );
}
