/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {

  let data = useParams()
  let [student , setStudent] = useState({})
  let navigate = useNavigate();
  const [hobby, setHobby] = useState([]);
  const [city , setCity] = useState(["Surat","Baroda","Ahmedabad","Mumbai"])
    

  useEffect(() =>{
    // console.log(data);
    let studentData = JSON.parse(localStorage.getItem('emp'));
    setStudent(studentData[data.index])
    setHobby(studentData[data.index]['hobby'])
  },[setStudent]);

  let getInput = (e) =>{
      let name = e.target.name;
      let value = e.target.value;

      let ho = [...hobby];
    if(name == "hobby") {
      if(e.target.checked) {
       ho.push(e.target.value)
       } else {
        ho = ho.filter((v,i) => v !== e.target.value);
      }
      value=ho;
    }
    console.log(ho);
    setHobby(ho);

      setStudent({...student,[name]:value});

  }

  let submitData = (e) => {
    e.preventDefault();
    let studentData = JSON.parse(localStorage.getItem('emp'));
    // console.log(student)
    studentData[data.index] = student;
    console.log(studentData)
    localStorage.setItem("emp", JSON.stringify(studentData));
    navigate("/view")
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Update Page</h1>
      <form method="post" onSubmit={(e) => submitData(e)}>
        <table border={1} align="center">
          <tr>
            <td>Enter name</td>
            <td>
              <input
                type="text"
                name="name"
                value={student.name? student.name : ""}
                onChange={(e) => getInput(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Enter email</td>
            <td>
              <input
                type="text"
                name="email"
                value={student.email? student.email : ""}
                onChange={(e) => getInput(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Enter Password</td>
            <td>
              <input
                type="password"
                name="password"
                value={student.password? student.password : ""}
                onChange={(e) => getInput(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Enter Gender</td>
            <td>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => getInput(e)}
                checked={student.gender == "male" ? "checked" : ""}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => getInput(e)}
                checked={student.gender == "female" ? "checked" : ""}
              />
              Female
            </td>
          </tr>
          <tr>
            <td>Hobby</td>
            <td>
              <input type="checkbox" 
              name="hobby" 
              value="Cricket" 
              onChange={(e) => getInput(e)}
              checked={hobby.includes("Cricket") ? "checked" : ""}
               />
               Cricket
              

              <input type="checkbox" 
              name="hobby" 
              value="Swimming" 
              onChange={(e) => getInput(e)}
              checked={hobby.includes("Swimming") ? "checked" : ""}
               />
              Swimming

              <input type="checkbox" 
              name="hobby" 
              value="Travelling" 
              onChange={(e) => getInput(e)} 
              checked={hobby.includes("Travelling") ? "checked" : ""}
              />
              Travelling

              <input type="checkbox" 
              name="hobby" 
              value="Coding" 
              onChange={(e) => getInput(e)}   
              checked={hobby.includes("Coding") ? "checked" : ""}
              />
              Coding
            </td>
          </tr>
          <tr>
            <td>Enter City</td>
            <td>
              <select name="city" onChange={(e) => getInput(e)}>
                <option value="">--- Select City ---</option>
                {city.map((v,i) =>{
                  return(
                    <option value={v}
                    selected={student.city===v ? 'selected' : ""}>{v}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="submit" name="submit" value="Edit" />
            </td>
          </tr>
        </table>
      </form>
    </>
  )
}

export default Update;
