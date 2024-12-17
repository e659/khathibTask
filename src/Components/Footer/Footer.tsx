import React, { useState, useContext } from "react";
import logout from "../../assets/images/sidebar/logout.png";
import { userContext } from "../Context/userContext.jsx";
import { useNavigate } from "react-router-dom";
export default function Footer({ menuCollapse, menuIconClick }) {
  const navigate = useNavigate();
  const { userData } = useContext(userContext);
  const { setUserToken, usertoken } = useContext(userContext);
  // console.log(userData);
  // logout
  const logOut = () => {
    localStorage.removeItem("usertoken");
    navigate("/Login");
  };
  return (
    <footer className="Footer">
      {/* {userData ? (
        <div className="footer__user d-flex align-items-center">
          <div className="">
            <img src={userData.image} alt="profile" />
          </div>
          <div className="footer___userBox">
            <h4 className="">{`${userData.first_name.charAt(0).toUpperCase()+ userData.first_name.slice(1).toLowerCase()} ${userData.last_name.charAt(0).toUpperCase()+ userData.last_name.slice(1).toLowerCase()}`}</h4>
            <p className="">{userData.role.charAt(0).toUpperCase()+ userData.role.slice(1).toLowerCase()}</p>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {!menuCollapse ? (
        <div className="d-flex justify-content-between mt-3  ms-2 log__out">
          <p className="fw-bold">Logout</p>
          <img
            onClick={logOut}
            src={logout}
            alt="logout"
            className="footer___img cursor-pointer"
          />
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-4  ms-2 log__out">
          <img
          style={{transform:"translatex(15px)"}}
            onClick={logOut}
            src={logout}
            alt="logout"
            className="footer___img cursor-pointer"
          />
        </div>
      )}

      {/* <div className="d-flex justify-content-between mt-3  ms-2 log__out">
        <p className="fw-bold">Logout</p>
        <img
          onClick={logOut}
          src={logout}
          alt="logout"
          className="footer___img cursor-pointer"
        />
      </div> */}
    </footer>
  );
}
