import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaClipboardList,
  FaChartBar
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        Attendance Tracker
      </h2>

      <ul>

        <li>
          <NavLink to="/">
            <FaHome className="icon"/>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/students">
            <FaUserGraduate className="icon"/>
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/attendance">
            <FaClipboardList className="icon"/>
            Attendance
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports">
            <FaChartBar className="icon"/>
            Reports
          </NavLink>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;