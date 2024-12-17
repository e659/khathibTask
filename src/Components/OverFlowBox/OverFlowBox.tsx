import React from "react";
import overflowImg from "../../assets/images/overflow/Vector.png";
import service from "../../assets/images/overflow/service.png";
import "./OverFlowBox.scss";
export default function OverFlowBox() {
  return (
    <section className="mt-3 overFlow___sec ms-3">
      <div className="d-flex fw-600 overFlow__header ">
        {" "}
        <p>Overview</p>
      </div>

      <div className="container">
        <div className="row gx-5">
          <div className="col overflow__div p-3">
            <div className="d-flex">
              <img
                src={overflowImg}
                alt="overflow"
                className="overflow__img mx-2"
              />
              <p>Total Clients</p>
            </div>
            <div className="d-flex justify-content-around">
              <p>200</p>
              <p style={{ color: "rgba(34, 197, 94, 1)", fontSize: "13px" }}>
                + 36% From Last Year
              </p>
            </div>
          </div>

          <div className="col overflow__div p-3 mx-5">
            <div className="d-flex">
              <img
                src={overflowImg}
                alt="overflow"
                className="overflow__img mx-2"
              />
              <p>New Clients</p>
            </div>
            <div className="d-flex justify-content-around">
              <p>200</p>
              <p style={{ color: "rgba(239, 68, 68, 1)", fontSize: "13px" }}>
                + 36% From Last Year
              </p>
            </div>
          </div>
          <div className="col overflow__div p-3">
            <div className="d-flex">
              <img
                src={service}
                alt="overflow"
                className="overflow__img mx-2"
              />
              <p>In Service</p>
            </div>
            <div className="d-flex justify-content-around">
              <p>200</p>
              <p style={{ color: "rgba(34, 197, 94, 1)", fontSize: "13px" }}>+ 36% From Last Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
