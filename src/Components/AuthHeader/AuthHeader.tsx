import React from "react";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/logo.png";
function AuthHeader() {
  return (
    <>
      <Row>
        <div className="d-flex logo___div">
          <img src={Logo} alt="logo" className="login__logo" />
          <p className="fw-bold">Cook County Tax Appeal</p>
        </div>
      </Row>
    </>
  );
}

export default AuthHeader;
