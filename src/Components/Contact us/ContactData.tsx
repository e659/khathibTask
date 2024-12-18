import React, { useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import AddContact from "./AddContact";
export default function ContactData({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  const [Contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  // Handle row click to load data into the form
  const handleRowClick = (row) => {
    // console.log(row);
    setSelectedRow(row);
  };
  //getAllContacts
  async function getAllContacts(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(`${BASEURL}/contact_us/get_all_contact_us?${params.toString()}`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    setContacts(response?.data.data);
  }
  useEffect(() => {
    getAllContacts(query);
  }, [query]);
  console.log(Contacts);
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
                placeholder="Search Contact"
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
          </div>

          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  Name
                </th>
                {/* <th className="client__th" scope="col">
                      Last Name
                    </th> */}
                <th className="client__th" scope="col">
                  Email
                </th>
                <th className="client__th" scope="col">
                  Phone
                </th>
                <th className="client__th" scope="col">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {Contacts?.map((contact) => {
                return (
                  <tr key={contact.id} onClick={() => handleRowClick(contact)}>
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
                    <td className="client__td py-4">{contact.full_name}</td>

                    <td className="client__td py-4">{contact.email}</td>
                    <td className="client__td py-4">{contact.phone}</td>
                    <td className="client__td py-4">{contact.city}</td>
                    <td className="client__td py-4">
                      <AddContact
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
                placeholder="Search Contact"
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
          </div>
          <table className="table mt-2 p-4">
            <thead className="py-2">
              <tr>
                <th className="" scope="col"></th>
                <th className="client__th" scope="col">
                  Name
                </th>
                {/* <th className="client__th" scope="col">
                      Last Name
                    </th> */}
                <th className="client__th" scope="col">
                  Email
                </th>
                <th className="client__th" scope="col">
                  Phone
                </th>
                <th className="client__th" scope="col">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {Contacts?.map((contact) => {
                return (
                  <tr key={contact.id} onClick={() => handleRowClick(contact)}>
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
                    <td className="client__td py-4">{contact.full_name}</td>

                    <td className="client__td py-4">{contact.email}</td>
                    <td className="client__td py-4">{contact.phone}</td>
                    <td className="client__td py-4">{contact.city}</td>
                    <td className="client__td py-4">
                      <AddContact
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
