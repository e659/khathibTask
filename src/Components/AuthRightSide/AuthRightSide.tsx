import React from "react";
import Col from "react-bootstrap/Col";
import leftImg from "../../assets/images/loginImg.png";
import smallcirc from "../../assets/images/smalllogincircl.png";
import largcirc from "../../assets/images/largcircllogin.png";
export default function AuthRightSide() {
  return (
    <>
      <Col md={4} className="right___sideLogin">
        <div>
          <img
            src={leftImg}
            alt="loginImg"
            className="img-fluid right__imglogin"
          />
          <img src={largcirc} alt="vector" className="vector___1" />
          <img src={smallcirc} alt="vector" className="vector___2" />
          <img src={largcirc} alt="vector" className="vector___3" />
        </div>
      </Col>
    </>
  );
}
