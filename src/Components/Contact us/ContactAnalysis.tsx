import React from "react";
import totalMsg from "../../assets/images/contact/total messages.png";
import reply from "../../assets/images/contact/reply.png";
import pending from "../../assets/images/contact/pending.png";
import "./contact.scss";
export default function ContactAnalysis({
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
            <div className="row gx-5 employ__analysis ">
              <div className="col overflow__div p-3 contact___analysis border-0">
                <div className="d-flex align-items-center ">
                  <div className="Contactanalysis__img">
                    <img src={totalMsg} alt="" />
                  </div>
                  <div className="ms-3">
                    <p className="analysis_number text-black mb-0">9</p>
                    <p>Total Messages</p>
                  </div>
                </div>
              </div>
              <div className="col overflow__div p-3 contact___analysis border-0 mx-5">
                <div className="d-flex align-items-center ">
                  <div className="Contactanalysis__img">
                    <img src={pending} alt="" />
                  </div>
                  <div className="ms-3">
                    <p className="analysis_number text-black mb-0">5</p>
                    <p>Pending Messages</p>
                  </div>
                </div>
              </div>
              <div className="col overflow__div p-3 contact___analysis border-0">
                <div className="d-flex align-items-center ">
                  <div className="Contactanalysis__img">
                    <img src={reply} alt="" />
                  </div>
                  <div className="ms-3">
                    <p className="analysis_number text-black mb-0">4</p>
                    <p>Replied messages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-3 overFlow___sec ms-3">
        <div className="container">
          <div className="row gx-5 employ__analysis ">
            <div className="col overflow__div p-3 contact___analysis border-0">
              <div className="d-flex align-items-center ">
                <div className="Contactanalysis__img">
                  <img src={totalMsg} alt="" />
                </div>
                <div className="ms-3">
                  <p className="analysis_number text-black mb-0">9</p>
                  <p>Total Messages</p>
                </div>
              </div>
            </div>
            <div className="col overflow__div p-3 contact___analysis border-0 mx-5">
              <div className="d-flex align-items-center ">
                <div className="Contactanalysis__img">
                  <img src={pending} alt="" />
                </div>
                <div className="ms-3">
                  <p className="analysis_number text-black mb-0">5</p>
                  <p>Pending Messages</p>
                </div>
              </div>
            </div>
            <div className="col overflow__div p-3 contact___analysis border-0">
              <div className="d-flex align-items-center ">
                <div className="Contactanalysis__img">
                  <img src={reply} alt="" />
                </div>
                <div className="ms-3">
                  <p className="analysis_number text-black mb-0">4</p>
                  <p>Replied messages</p>
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
