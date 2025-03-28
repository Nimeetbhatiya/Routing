import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const [emp, setEmp] = useState({});
  const [allEmp, setAllEmp] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [city, setCity] = useState(["Surat", "Baroda", "Ahmedabad", "Mumbai"]);

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
      <h1 style={{ textAlign: "center", color: "#333", fontSize: "28px", marginBottom: "20px" }}>Home Page</h1>
      <form
        method="post"
        onSubmit={(e) => submitForm(e)}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f9f9f9"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Enter Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  onChange={getInputValue}
                  value={emp.name || ""}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Enter Email</td>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  onChange={getInputValue}
                  value={emp.email || ""}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Enter Password</td>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={getInputValue}
                  value={emp.password || ""}
                  style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Enter Gender</td>
              <td>
                <label style={{ marginRight: "10px" }}>
                  <input type="radio" name="gender" value="male" onChange={getInputValue} checked={emp.gender === "male"} />
                  Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" onChange={getInputValue} checked={emp.gender === "female"} />
                  Female
                </label>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Hobby</td>
              <td>
                {["Cricket", "Swimming", "Travelling", "Coding"].map((hobbyName) => (
                  <label key={hobbyName} style={{ marginRight: "10px", display: "block" }}>
                    <input type="checkbox" name="hobby" value={hobbyName} onChange={getInputValue} checked={hobby.includes(hobbyName)} />
                    {hobbyName}
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", fontWeight: "bold" }}>Enter City</td>
              <td>
                <select
                  name="city"
                  onChange={getInputValue}
                  style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                  <option value="">--- Select City ---</option>
                  {city.map((v, i) => (
                    <option key={i} value={v}>{v}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{ textAlign: "right", paddingTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <ToastContainer />
    </>
  );
}

export default Home;
