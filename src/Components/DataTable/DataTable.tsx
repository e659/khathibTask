import React, { useState, useEffect } from "react";
import "./DataTable.scss";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import AddNewClient from "../AddNewClient/AddNewClient";
import { InfinitySpin } from "react-loader-spinner";
import DropDown from "../DropDown/DropDown";
export default function DataTable({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  let [isLoading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  // Handle row click to load data into the form
  const handleRowClick = (row) => {
    // console.log(row);
    setSelectedRow(row);
  };

  // getAllClients Function
  async function getAllClients(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(`${BASEURL}/client/get_all_client?${params.toString()}`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    setClients(response?.data.data);
  }
  useEffect(() => {
    getAllClients(query);
  }, [query]);
  // console.log(clients);

  return (
    <>
      {menuCollapse ? (
        <div
          className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
          style={{ width: "1350px" }}
        >
          <div className="d-flex justify-content-between">
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
                placeholder="Search Clinet"
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

            <AddNewClient />
          </div>

          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  Client Name
                </th>
                <th className="client__th" scope="col">
                  Contact Information
                </th>
                <th className="client__th" scope="col">
                  Added Date{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((client) => {
                return (
                  <tr key={client.id} onClick={() => handleRowClick(client)}>
                    <td className="py-4">
                      <input
                        className="form-check-input cursor-pointer"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      ></label>
                    </td>
                    <td className="client__td py-4">{`${client.first_name} ${client.last_name}`}</td>
                    <td className="client__td py-4">{client.email}</td>
                    <td className="client__td py-4">{client.start_date}</td>
                    <td className="client__td py-4">
                      <DropDown
                        Clients={clients}
                        handleRowClick={handleRowClick}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
          style={{ width: "1200px" }}
        >
          <div className="d-flex justify-content-between">
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
                placeholder="Search Clinet"
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

            <AddNewClient />
          </div>

          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  Client Name
                </th>
                <th className="client__th" scope="col">
                  Contact Information
                </th>
                <th className="client__th" scope="col">
                  Added Date{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((client) => {
                return (
                  <tr key={client.id} onClick={() => handleRowClick(client)}>
                    <td className="py-4">
                      <input
                        className="form-check-input cursor-pointer"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      ></label>
                    </td>
                    <td className="client__td py-4">{`${client.first_name} ${client.last_name}`}</td>
                    <td className="client__td py-4">{client.email}</td>
                    <td className="client__td py-4">{client.start_date}</td>
                    <td className="client__td py-4">
                      <DropDown
                        Clients={clients}
                        handleRowClick={handleRowClick}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
