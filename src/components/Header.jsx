import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        padding: "15px 0",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      <nav style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {[
          { name: "Home", path: "/" },
          { name: "Show Data", path: "/view" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#007bff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;
