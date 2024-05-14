import React, { useState, useEffect, useMemo } from "react";

function BasicTable({ data, columns }) {
  const [sorting, setSorting] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!filter) return data;
    const filteredRows = [];
    for (var i = 0; i < data.length; i++) {
      const row = data[i];
      var checkRow = false;
      for (var j = 0; j < columns.length; j++) {
        const column = columns[j];
        if (
          String(row[column.accessor])
            .toLowerCase()
            .includes(filter.toLowerCase())
        ) {
          checkRow = true;
          break;
        }
      }
      if (checkRow) {
        filteredRows.push(row);
      }
    }
    return filteredRows;
  }, [data, columns, filter]);

  const sortedData = useMemo(() => {
    if (!sorting) return filteredData;
    return [...filteredData].sort((a, b) => {
      const { accessor, dir } = sorting;
      if (a[accessor] < b[accessor]) {
        return dir === "asc" ? -1 : 1;
      }
      if (a[accessor] > b[accessor]) {
        return dir === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sorting]);

  const displayData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sorting]);

  return (
    <div className="w3-container">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: "10px" }}
      />
      <table className="w3-table-all">
        <tbody>
          {displayData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous page
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next page
        </button>
      </div>
    </div>
  );
}

export default BasicTable;
