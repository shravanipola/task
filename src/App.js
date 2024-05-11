import { useEffect, useState } from "react";
import "./App.css";
import BasicTable from "./Components/BasicTable";

function App() {
  const [users, setUsers] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  /** @type import('@tanstack/react-table').ColumnDef<any> */

  const userColumns = [
    {
      header: "Username",
      accessorKey: "login.username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ];

  return (
    <>
      <h1 className="heading" style={{ textAlign: "center" }}>
        React Table
      </h1>
      <BasicTable data={users} columns={userColumns} />
    </>
  );
}

export default App;
