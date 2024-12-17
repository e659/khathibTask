import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "./login.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthRightSide from "../AuthRightSide/AuthRightSide.js";
import { userContext } from "../Context/userContext";
import { BASEURL } from "../../../constans/index.js";
import AuthHeader from "../AuthHeader/AuthHeader.js";
export default function Login() {
  const navigate = useNavigate();
  // using UserContext
  const { setUserToken } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  const { login } = useContext(userContext);
 
  const [passwordType, setPasswordType] = useState("password");
  // showHide Password
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  // navigateTo Home
  const navigateToHome = () => {
    navigate("/");
  };

  //  validation using yup
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
 
  return (
    <>
    <Formik
        // inputsData
        initialValues={{
          email: "",
          password: "",
        }}
        // validation
        validationSchema={SignInSchema}
        // send data to backend
        onSubmit={async (values) => {
          const { data }: object = await login(values);
          // handel error if request faild

          console.log(data);
          if (data.success === true) {
            localStorage.setItem("usertoken", data.token);
            // setToken in context
            setUserToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.data));
            setUserData(data.data);
            // navigateTo home
            navigateToHome();
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
            <AuthHeader />
            <Row className="w-75  login___row">
              <Col md={6} className="left__side">
                <div className="">
                  <div>
                    <h4 className="fs-3 fw-500 mb-4">Welcome !</h4>
                    <h2 className="fs-3">login to </h2>
                    <h4 className="fs-6 fw-normal">Cook County Tax Appeal</h4>
                  </div>
                </div>
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
                  <Row className="mb-2">
                    <Form.Group controlId="formGridPass">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type={passwordType}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                      />
                    </Form.Group>
                    {errors.password && touched.password ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.password}
                      </Col>
                    ) : null}
                    <button
                      type="button"
                      className="btn border-none eyeBtn w-25 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible size={15} />
                      ) : (
                        <AiOutlineEye size={15} />
                      )}
                    </button>
                  </Row>
                  <Row className="mt-3 d-flex justify-content-between ">
                    <Col md={6} className="cursor-pointer">
                      <Form.Check
                        type="checkbox"
                        id="custom-checkbox"
                        label="Rememebr me"
                      />
                    </Col>
                    <Col
                      md={6}
                      className="d-flex justify-content-end cursor-pointer"
                    >
                      <Link
                        className="light-color fw-normal"
                        to={"/ForgetPassword"}
                      >
                        Forgot Password ?
                      </Link>
                    </Col>
                  </Row>
                  <Row className="mt-4 cursor-pointer">
                    <Button type="submit">login</Button>
                  </Row>
                  <Row className="text-center mt-5 cursor-pointer">
                    <p className="light-color fw-norma">
                      Don’y have an Account ?&nbsp;
                      <Link className="text-main fw-bold" to={"/Register"}>
                        Register
                      </Link>
                    </p>
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
