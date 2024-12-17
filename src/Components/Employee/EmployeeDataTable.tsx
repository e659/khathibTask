import React, { useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import DropDown from "./DropDown";
import AddNewEmplyee from "./AddNewEmplyee";
export default function EmployeeDataTable({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  const [Employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [permision, setPermision] = useState();
  // Handle row click to load data into the form
  const handleRowClick = (row) => {
    // console.log(row);
    setSelectedRow(row);
  };

  //   getAllEmployee
  async function getAllEmplyee(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(`${BASEURL}/admin/get_all_admin?${params.toString()}`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    setEmployees(response?.data.data);
  }
  //   getPermission
  async function getPermision() {
    const response = await axios
      .get(`${BASEURL}/groupPermission/get_all_group_permission`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    setPermision(response.data.data);
    // console.log(response.data.data);
  }
  useEffect(() => {
    getAllEmplyee(query);
    getPermision();
  }, [query]);
  console.log(Employees);

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
                placeholder="Search Employee"
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

            <AddNewEmplyee permission={permision} />
          </div>

          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  First Name
                </th>
                <th className="client__th" scope="col">
                  Last Name
                </th>
                <th className="client__th" scope="col">
                  Email
                </th>
                <th className="client__th" scope="col">
                  Phone
                </th>
                <th className="client__th" scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Employees?.map((Employee) => {
                return (
                  <tr
                    key={Employee.id}
                    onClick={() => handleRowClick(Employee)}
                  >
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
                    <td className="client__td py-4">{Employee.first_name}</td>
                    <td className="client__td py-4">{Employee.last_name}</td>
                    <td className="client__td py-4">{Employee.email}</td>
                    <td className="client__td py-4">{Employee.phone}</td>
                    <td className="client__td py-4">{Employee.state}</td>
                    <td className="client__td py-4">
                      <DropDown
                        Employees={Employees}
                        permision={permision}
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
                placeholder="Search Employee"
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

            <AddNewEmplyee permission={permision} />
          </div>

          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  First Name
                </th>
                <th className="client__th" scope="col">
                  Last Name
                </th>
                <th className="client__th" scope="col">
                  Email
                </th>
                <th className="client__th" scope="col">
                  Phone
                </th>
                <th className="client__th" scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Employees?.map((Employee) => {
                return (
                  <tr
                    key={Employee.id}
                    onClick={() => handleRowClick(Employee)}
                  >
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
                    <td className="client__td py-4">{Employee.first_name}</td>
                    <td className="client__td py-4">{Employee.last_name}</td>
                    <td className="client__td py-4">{Employee.email}</td>
                    <td className="client__td py-4">{Employee.phone}</td>
                    <td className="client__td py-4">
                      {Employee.group_permission.permissions.status}
                    </td>
                    <td className="client__td py-4">
                      <DropDown
                        Employees={Employees}
                        permision={permision}
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
