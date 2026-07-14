import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <h2>Attendance Tracker</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/reports">Reports</Link>
      </div>
    </nav>
  );
}
export default Navbar;