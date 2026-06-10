import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="header">
      <span> Clinic Manager </span> 
      <div className="links">
        <NavLink
          to="/View"
          className={({ isActive }) =>
            isActive ? "active-style" : "normal-style"
          }
        >
          View
        </NavLink>
        <NavLink
          to={"/Create"}
          className={({ isActive }) =>
            isActive ? "active-style" : "normal-style"
          }
        >
          Add Patient
        </NavLink>
        <NavLink
          to="/Appointments"
          className={({ isActive }) =>
            isActive ? "active-style" : "normal-style"
          }
        >
          Appointments
        </NavLink>
      </div>
    </header>
  );
};
export default NavBar;
