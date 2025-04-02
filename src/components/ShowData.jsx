/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowData() {
  const [allEmp, setAllEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [pageNo, setPageNo] = useState([]);

  useEffect(() => {
    changeEffect();
  }, [setAllEmp, currentPage]);

  const changeEffect = () => {
    let newEmp = JSON.parse(localStorage.getItem("emp")) || [];
    let totalPages = Math.ceil(newEmp.length / perPage);
    let pages = [];
    for (var i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    setPageNo(pages);

    let endIndex = currentPage * perPage;
    let firstIndex = endIndex - perPage;
    setStartIndex(firstIndex);
    let newArray = newEmp.slice(firstIndex, endIndex);
    setAllEmp(newArray);
  };

  const onDelete = (e, index) => {
    e.preventDefault();
    let oldEmp = JSON.parse(localStorage.getItem("emp")) || [];
    oldEmp.splice(index, 1);

    localStorage.setItem("emp", JSON.stringify(oldEmp));
    setAllEmp(oldEmp);
    changeEffect();
  };

  let sortinByName = (e) => {
    let allData = [...allEmp];
    if (e.target.value === "asc") {
      allData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      allData.sort((a, b) => b.name.localeCompare(a.name));
    }
    setAllEmp(allData);
  };

  const changePage = (e, pageno) => {
    e.preventDefault();
    setCurrentPage(pageno);
  };

  // Dark Theme Inline Styles
  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#121212",
      color: "#ffffff",
      padding: "20px",
      minHeight: "100vh",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #555",
      backgroundColor: "#333",
      color: "#fff",
    },
    select: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #555",
      backgroundColor: "#333",
      color: "#fff",
    },
    tableContainer: {
      width: "80%",
      margin: "auto",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#1e1e1e",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)",
    },
    th: {
      background: "#282c34",
      color: "#61dafb",
      textTransform: "uppercase",
      padding: "12px",
      borderBottom: "1px solid #444",
    },
    td: {
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #444",
      color: "#ddd",
    },
    trEven: {
      background: "#252525",
    },
    trHover: {
      background: "#333",
    },
    button: {
      background: "#ff4d4d",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "5px",
    },
    buttonHover: {
      background: "#cc0000",
    },
    linkButton: {
      textDecoration: "none",
      background: "#28a745",
      color: "white",
      padding: "8px 12px",
      borderRadius: "5px",
      marginLeft: "5px",
    },
    pagination: {
      textAlign: "center",
      marginTop: "20px",
    },
    paginationButton: {
      background: "#007bff",
      padding: "6px 12px",
      margin: "5px",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1>ShowData Page</h1>

      <div style={styles.controls}>
        <input
          type="text"
          name="search"
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select name="sorting" onChange={sortinByName} style={styles.select}>
          <option value="">--- Sort By Name ---</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Hobby</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEmp
              .filter((v) => {
                if (search === "") return v;
                return (
                  v.name.toLowerCase().includes(search.toLowerCase()) ||
                  v.email.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((v, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                  <td style={styles.td}>{v.name}</td>
                  <td style={styles.td}>{v.email}</td>
                  <td style={styles.td}>{v.password}</td>
                  <td style={styles.td}>{v.gender}</td>
                  <td style={styles.td}>{v.hobby.toString()}</td>
                  <td style={styles.td}>{v.city}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.button}
                      onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                      onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                      onClick={(e) => onDelete(e, i)}
                    >
                      Delete
                    </button>
                    <Link style={styles.linkButton} to={`/updateData/${i}`}>
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div style={styles.pagination}>
        {pageNo.map((no) => (
          <button
            key={no}
            style={styles.paginationButton}
            onClick={(e) => changePage(e, no + 1)}
          >
            {no + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShowData;
