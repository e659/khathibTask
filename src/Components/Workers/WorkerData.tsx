import React, { useState, useEffect } from "react";
import AddWorker from "./AddWorker";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import "./worker.scss";
import DropDown from "./DropDown";
import { CiSearch } from "react-icons/ci";
export default function WorkerData({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  const [workers, setWorkers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (row) => {
    // console.log(row);
    setSelectedCard(row);
  };
  //   getAllEmployee
  async function getAllWorkers(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(`${BASEURL}/worker/get_all_worker?${params.toString()}`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    console.log(response);
    setWorkers(response?.data?.data);
  }
  console.log(workers);
  useEffect(() => {
    getAllWorkers(query);
  }, [query]);
  return (
    <>
      {menuCollapse ? (
        <div className="container mt-4" style={{width:"1350px"}}>
          <div className="row bg-white p-3 worker_row">
            <div className="d-flex justify-content-between mt-2">
              {/* search bar */}
              <div className="ms-3">
                <CiSearch
                  className="client__searchIcon"
                  size={25}
                  style={{ color: "rgba(161, 161, 170, 1)" }}
                />
                <input
                  className="client__searchInput"
                  type="text"
                  placeholder="Search Worker"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    color: "rgba(161, 161, 170, 1)",
                    fontWeight: "bold",
                    fontSize: "15px",
                    border: "none",
                  }}
                />
              </div>

              <AddWorker />
            </div>

            {workers?.map((worker) => {
              return (
                <div
                  className="col-md-4 my-3"
                  key={worker.id}
                  onClick={() => handleCardClick(worker)}
                >
                  <div className="worker___container position-relative">
                    <DropDown
                      Workers={workers}
                      handleCardClick={handleCardClick}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                    />
                    <div className="d-flex align-items-center  mt-2 p-2">
                      <img src={worker.image} alt="worker" />
                      <div className="ms-3">
                        <p className="woker__name">{`${
                          worker.first_name.charAt(0).toUpperCase() +
                          worker.first_name.slice(1).toLowerCase()
                        } ${
                          worker.last_name.charAt(0).toUpperCase() +
                          worker.last_name.slice(1).toLowerCase()
                        }`}</p>
                        <p className="worker__title">{worker.job_title}</p>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex ms-4">
                        <p className="worker_desc">{worker.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container mt-4" style={{width:"1200px"}}>
          <div className="row bg-white p-3 worker_row">
            <div className="d-flex justify-content-between mt-2">
              {/* search bar */}
              <div className="ms-3">
                <CiSearch
                  className="client__searchIcon"
                  size={25}
                  style={{ color: "rgba(161, 161, 170, 1)" }}
                />
                <input
                  className="client__searchInput"
                  type="text"
                  placeholder="Search Worker"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    color: "rgba(161, 161, 170, 1)",
                    fontWeight: "bold",
                    fontSize: "15px",
                    border: "none",
                  }}
                />
              </div>

              <AddWorker />
            </div>

            {workers?.map((worker) => {
              return (
                <div
                  className="col-md-4 my-3"
                  key={worker.id}
                  onClick={() => handleCardClick(worker)}
                >
                  <div className="worker___container position-relative">
                    <DropDown
                      Workers={workers}
                      handleCardClick={handleCardClick}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                    />
                    <div className="d-flex align-items-center  mt-2 p-2">
                      <img src={worker.image} alt="worker" />
                      <div className="ms-3">
                        <p className="woker__name">{`${
                          worker.first_name.charAt(0).toUpperCase() +
                          worker.first_name.slice(1).toLowerCase()
                        } ${
                          worker.last_name.charAt(0).toUpperCase() +
                          worker.last_name.slice(1).toLowerCase()
                        }`}</p>
                        <p className="worker__title">{worker.job_title}</p>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex ms-4">
                        <p className="worker_desc">{worker.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
