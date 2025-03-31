import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [emp, setEmp] = useState({});
  const [allEmp, setAllEmp] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [city] = useState(["Surat", "Baroda", "Ahmedabad", "Mumbai"]);

  useEffect(() => {
    let allRecords = JSON.parse(localStorage.getItem('emp'));
    setAllEmp(allRecords || []);
  }, []);

  let getInputValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let ho = [...hobby];

    if (name === "hobby") {
      if (e.target.checked) {
        ho.push(e.target.value);
      } else {
        ho = ho.filter((v) => v !== e.target.value);
      }
      value = ho;
    }
    setHobby(ho);
    setEmp({ ...emp, [name]: value });
  };

  let submitForm = (e) => {
    e.preventDefault();
    let record = [...allEmp, emp];
    setAllEmp(record);
    localStorage.setItem("emp", JSON.stringify(record));
    setEmp({});
    setHobby([]);
    toast.success("Record inserted successfully");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff", fontSize: "32px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "2px" }}>Employee Form</h1>
      <form
        onSubmit={submitForm}
        style={{
          maxWidth: "450px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.2)",
          backgroundColor: "#1e1e1e",
          fontFamily: "Arial, sans-serif",
          color: "#fff"
        }}
      >
        {[
          { label: "Enter Name", type: "text", name: "name" },
          { label: "Enter Email", type: "email", name: "email" },
          { label: "Enter Password", type: "password", name: "password" }
        ].map(({ label, type, name }) => (
          <div key={name} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={label}
              onChange={getInputValue}
              value={emp[name] || ""}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #555", backgroundColor: "#333", color: "#fff" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Gender</label>
          {['male', 'female'].map((gender) => (
            <label key={gender} style={{ marginRight: "15px" }}>
              <input type="radio" name="gender" value={gender} onChange={getInputValue} checked={emp.gender === gender} /> {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Hobby</label>
          {["Cricket", "Swimming", "Travelling", "Coding"].map((hobbyName) => (
            <label key={hobbyName} style={{ display: "block" }}>
              <input type="checkbox" name="hobby" value={hobbyName} onChange={getInputValue} checked={hobby.includes(hobbyName)} /> {hobbyName}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Select City</label>
          <select
            name="city"
            onChange={getInputValue}
            value={emp.city || ""}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #555", backgroundColor: "#333", color: "#fff" }}
          >
            <option value="">--- Select City ---</option>
            {city.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s ease-in-out"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Home;
