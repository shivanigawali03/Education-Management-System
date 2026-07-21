import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>EMS Admin</h2>
      <hr />

      <p><Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Dashboard</Link></p>

      <p><Link to="/students" style={{ color: "white", textDecoration: "none" }}>🎓 Students</Link></p>

      <p><Link to="/users" style={{ color: "white", textDecoration: "none" }}>👤 Users</Link></p>

      <p><Link to="/attendance" style={{ color: "white", textDecoration: "none" }}>📅 Attendance</Link></p>

      <p><Link to="/batch" style={{ color: "white", textDecoration: "none" }}>📚 Batch</Link></p>

      <p><Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>📝 Tasks</Link></p>

      <p><Link to="/reports" style={{ color: "white", textDecoration: "none" }}>📊 Reports</Link></p>
    </div>
  );
}

export default Sidebar;