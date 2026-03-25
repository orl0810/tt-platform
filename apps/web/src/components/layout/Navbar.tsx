import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeStyle = { fontWeight: "bold", color: "#6366f1" };

  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>TT Platform</span>
      <NavLink to="/sessions" style={({ isActive }) => (isActive ? activeStyle : {})}>
        Sessions
      </NavLink>
      <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : {})}>
        Profile
      </NavLink>
    </nav>
  );
}
