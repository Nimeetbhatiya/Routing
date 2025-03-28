/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ShowData() {
  const [allEmp , setAllEmp] = useState([]);
  const [search , setSearch] = useState(null);
  const [perPage , setPerPage] = useState(2);
  const [currentPage , setCurrentPage] = useState(1);
  const[startIndex,setStartIndex] = useState(0)
  const [pageNo , setPageNo] = useState([]);

  useEffect(() => {
    changeEffect();
  },[setAllEmp,currentPage]); 

  const changeEffect = ()=>{
    let newEmp = JSON.parse(localStorage.getItem("emp"));
    let totalPages = Math.ceil(newEmp.length/perPage);
    let pages = [];
    for(var i=0; i<totalPages; i++){
      pages.push(i);
    }
    setPageNo(pages);

    let endIndex = currentPage*perPage;
    let firstIndex = endIndex-perPage;
    setStartIndex(firstIndex);
    let newArray = newEmp.slice(firstIndex , endIndex);
    console.log(newArray)
    setAllEmp(newArray);
  }

  const onDelete =(e,index)=>{
    e.preventDefault();
    let oldEmp = JSON.parse(localStorage.getItem('emp'));
    oldEmp.splice(index,1);
    
    localStorage.setItem("emp",JSON.stringify(oldEmp));
    setAllEmp(oldEmp);
    changeEffect()
    console.log
  };

  let sortinByName = (e) =>{
    console.log(e.target.value);
    let allData = [...allEmp]
    if(e.target.value == 'asc'){
      allData.sort((a,b) => a.name.localeCompare(b.name));
    } else {
      allData.sort((a,b) => b.name.localeCompare(a.name));
    }
    setAllEmp(allData);
  };

  const changePage=(e,pageno)=>{
    e.preventDefault();
    setCurrentPage(pageno)
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>ShowData Page</h1>
      <input type="text" 
      name="search" 
      placeholder='Search here'
      onChange={(e) => setSearch(e.target.value)}/>

      <select name="sorting" onChange={(e) => sortinByName(e)}>
        <option value="">--- Select Sort ---</option>
        <option value="asc">Ascending</option>
        <option value="dsc">Descending</option>
      </select>
        <table border={1} align="center">
          
          <tr>
            <td>name</td>
            <td>email</td>
            <td>Password</td>
            <td>Gender</td>
            <td>Hobby</td>
            <td>City</td>
            <td>action</td>
          </tr>
          {allEmp
          .filter((v,i) => {
            if(search == null){
              return v;
            } else if(v.name.includes(search)){
                return v;
              } else if(v.email.includes(search)) {
                 return v;
              }
          }).map((v,i)=>(
            <tr>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.password}</td>
              <td>{v.gender}</td>
              <td>{v.hobby.toString()}</td>
              <td>{v.city}</td>
              <td>
              <button onClick={(e)=>onDelete(e,startIndex+i)}>Delete</button>
              <Link to={"/updateData/" + (startIndex+i)}>Update</Link>
              </td>
            </tr>
          ))
          }
         
          <tr>
            <td colSpan={7}>
              {
                pageNo.map((no)=>(
                  <button onClick={(e)=>(changePage(e,no+1))}>{no+1}</button>
                ))
              }
            </td>
          </tr>
        </table>
    </>
  );
}

export default ShowData;
