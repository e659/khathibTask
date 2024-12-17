import React from "react";
import totalEmployee from "../../assets/images/Employee/Group.png";
import activeEmployee from "../../assets/images/Employee/icon.png";
import inactiveEmployee from "../../assets/images/Employee/2.png";
import "./employee.scss";
export default function EmployeeAnalaysis({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  return (
    <>
      {!menuCollapse ? (
        <section className="mt-3 overFlow___sec ms-3">
          <div className="container">
            <div className="row gx-5 employ__analysis">
              <div className="col overflow__div p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Total Employee</p>
                    <p className="analysis_number">4</p>
                  </div>
                  <div className="analysis__img">
                    <img src={totalEmployee} alt="" />
                  </div>
                </div>
              </div>

              <div className="col overflow__div p-3 mx-5 sec__overflow">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Active Employee</p>
                    <p className="analysis_number">3</p>
                  </div>
                  <div className="analysis__img">
                    <img src={activeEmployee} alt="" />
                  </div>
                </div>
              </div>
              <div className="col overflow__div p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Inactive Employee </p>
                    <p className="analysis_number">1</p>
                  </div>
                  <div className="analysis__img">
                    <img src={inactiveEmployee} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-3 overFlow___sec ms-3">
          <div className="container">
            <div className="row gx-5 employ__analysis">
              <div className="col overflow__div p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Total Employee</p>
                    <p className="analysis_number">4</p>
                  </div>
                  <div className="analysis__img">
                    <img src={totalEmployee} alt="" />
                  </div>
                </div>
              </div>

              <div className="col overflow__div p-3 mx-5">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Active Employee</p>
                    <p className="analysis_number">3</p>
                  </div>
                  <div className="analysis__img">
                    <img src={activeEmployee} alt="" />
                  </div>
                </div>
              </div>
              <div className="col overflow__div p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Inactive Employee </p>
                    <p className="analysis_number">1</p>
                  </div>
                  <div className="analysis__img">
                    <img src={inactiveEmployee} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
