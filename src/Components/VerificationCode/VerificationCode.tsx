import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AuthRightSide from "../AuthRightSide/AuthRightSide.js";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./verifyCode.scss";
import {BASEURL} from "../../../constans/index.js";
import AuthHeader from "../AuthHeader/AuthHeader.js";
export default function VerificationCode() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  // const baseUrl:string = "https://khatib-law-v1-3185dfe428a5.herokuapp.com";
   // showHide Password
   const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  //  validation using yup
  const verifyCodeSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    verification_code: Yup.string().required("Required"),
    new_password: Yup.string().required("Required"),
    confirm_new_password: Yup.string().required("Required"),
  });
  // navigateTo login
  const navigateToLogin = () => {
    navigate("/Login");
  };
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          email: "",
          verification_code: "",
          new_password: "",
          confirm_new_password: "",
        }}
        // validation
        validationSchema={verifyCodeSchema}
        // send data to backend
        onSubmit={async (values) => {
          console.log(values);
          const { data }:object= await axios
            .patch(
              `${BASEURL}/admin/verification_admin_forget_password`,
              values
            )
            // handel error if request faild
            .catch((err) => {
              console.log(err);
            });
          console.log(data);
          if (data.success === true) {
            // navigateTo login
            navigateToLogin();
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
                  <Row className="mb-4" position-relative>
                    <Form.Group controlId="formGridcode">
                      <Form.Label>Code:</Form.Label>
                      <Form.Control
                        type="text"
                        name="verification_code"
                        value={values.verification_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your code"
                      />
                    </Form.Group>
                    {errors.verification_code && touched.verification_code ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.verification_code}
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="mb-4" position-relative>
                    <Form.Group controlId="formGridpass">
                      <Form.Label>NewPassword:</Form.Label>
                      <Form.Control
                        type={passwordType}
                        name="new_password"
                        value={values.new_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your newPassword"
                      />
                    </Form.Group>
                    {errors.new_password && touched.new_password ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.new_password}
                      </Col>
                    ) : null}
                    <button
                      type="button"
                      className="btn border-none eyeBtn1 w-25 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible size={15} />
                      ) : (
                        <AiOutlineEye size={15} />
                      )}
                    </button>
                  </Row>
                  <Row className="mb-4" position-relative>
                    <Form.Group controlId="formGridpass1">
                      <Form.Label>Re-Password:</Form.Label>
                      <Form.Control
                        type={passwordType}
                        name="confirm_new_password"
                        value={values.confirm_new_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your newPassword"
                      />
                    </Form.Group>
                    {errors.confirm_new_password &&
                    touched.confirm_new_password ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.confirm_new_password}
                      </Col>
                    ) : null}
                    <button
                      type="button"
                      className="btn border-none eyeBtn2 w-25 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible size={15} />
                      ) : (
                        <AiOutlineEye size={15} />
                      )}
                    </button>
                  </Row>
                  <Row className="mt-4 ms-2 cursor-pointer">
                    <Button className="w-25" type="submit">
                      Send
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
