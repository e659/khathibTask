import React, { useContext, useState, useEffect } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { sidebarLinks } from "../../../constans/index";
import Footer from "../Footer/Footer";
import { userContext } from "../Context/userContext";
import { NavLink, Outlet } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdPerson3 } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { TbDatabase } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
function SideBar({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  // useContext
  const { userData } = useContext(userContext);
  // sidebar functions
  // const [menuCollapse, setMenuCollapse] = useState(false);
  // const menuIconClick = () => {
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };
  // const [menuToggle, setMenuToggle] = useState(false);

  // const handleToggleSidebar = (value: any) => {
  //   setMenuToggle(value);
  // };
  return (
    <div>
      {!menuCollapse ? (
        <div className="cursor-pointer close__openSidebar">
          <MdKeyboardArrowLeft onClick={menuIconClick} />
        </div>
      ) : (
        <div
          className="cursor-pointer close__openSidebar"
          style={{ transform: "translate(-70px, -12px)" }}
        >
          <MdKeyboardArrowRight onClick={menuIconClick} />
        </div>
      )}

      <Sidebar
        className="sidebar"
        collapsed={menuCollapse}
        breakPoint={"md"}
        onToggle={handleToggleSidebar}
        toggled={menuToggle}
      >
        <Link to={"/"} className="side___logo ">
          {!menuCollapse ? (
            <div className="d-flex logo___div side___logodiv mt-3">
              <img src={Logo} alt="logo" className="" />
              <p className="fw-bold">Cook County Tax Appeal</p>
            </div>
          ) : (
            <div
              className="d-flex logo___div side___logodiv mt-3"
              style={{ transform: "translatex(40%)" }}
            >
              <img src={Logo} alt="logo" className="" />
            </div>
          )}
        </Link>
        {!menuCollapse ? (
          <Menu>
            <nav className="d-flex flex-column sidebar__nav">
              <NavLink
                to={"/Employee"}
                className={`({ isActive }) => (isActive ? "active" : "") mt-4`}
              >
                <MdPerson3 size={25} className="mx-2" />
                Employee
              </NavLink>

              <NavLink
                to={"/Clients"}
                className={`({ isActive }) => (isActive ? "active" : "") my-4`}
              >
                <MdSupervisorAccount size={28} className="mx-2" />
                Clients
              </NavLink>

              <NavLink
                to={"/Blog"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <TbDatabase size={25} className="mx-2" />
                Blogs
              </NavLink>
              <NavLink
                to={"/Workers"}
                className={`({ isActive }) => (isActive ? "active" : "") my-4`}
              >
                <GrUserWorker  size={25} className="mx-2" />
                Workers
              </NavLink>
            </nav>

          
          </Menu>
        ) : (
          <Menu>
            <nav className="d-flex flex-column sidebar__nav">
              <NavLink
                to={"/Employee"}
                className={`({ isActive }) => (isActive ? "active" : "") mt-4`}
              >
                <MdPerson3 size={25} className="mx-2" style={{ transform: "translatex(20%)" }} />
               
              </NavLink>

              <NavLink
                to={"/Clients"}
                className={`({ isActive }) => (isActive ? "active" : "") my-4`}
              >
                <MdSupervisorAccount size={28} className="mx-2" style={{ transform: "translatex(-9%)" }}/>
              
              </NavLink>

              <NavLink
                to={"/Blog"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <TbDatabase size={25} className="mx-2" style={{ transform: "translatex(20%)" }}/>
               
              </NavLink>
              <NavLink
                to={"/Workers"}
                className={`({ isActive }) => (isActive ? "active" : "") my-4`}
              >
                <GrUserWorker  size={25} className="mx-2" style={{ transform: "translatex(20%)" }}/>
               
              </NavLink>
            </nav>

            {/* <MenuItem
              style={{ transform: "translatex(-5%)" }}
              className="pt-3 
            "
            >
              <MdPerson3 size={25} />
              Employee{" "}
            </MenuItem>
            <MenuItem className="py-3" style={{ transform: "translatex(-5%)" }}>
              <MdSupervisorAccount size={26} />
              Clients{" "}
            </MenuItem>
            <MenuItem style={{ transform: "translatex(-5%)" }}>
              <TbDatabase size={23} />
              Data Script
            </MenuItem> */}
          </Menu>
        )}
        {/* <Menu>
          <MenuItem className="pt-3 ">
            <MdPerson3 size={25} className="mx-2" />
            Employee{" "}
          </MenuItem>
          <MenuItem className="py-3" style={{ transform: "translatex(-10px)" }}>
            <MdSupervisorAccount size={28} className="mx-2" />
            Clients{" "}
          </MenuItem>
          <MenuItem>
            <TbDatabase size={25} className="mx-2" />
            Data Script
          </MenuItem>
        </Menu> */}
        {/* footer */}
        <Footer
          user={userData}
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />
      </Sidebar>
    </div>
  );
}

export default SideBar;
