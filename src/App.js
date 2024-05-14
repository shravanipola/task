import { useEffect, useState } from "react";
import BasicTable from "./Components/BasicTable";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setUsers(
          data.results.map((user) => ({
            username: user.login.username,
            email: user.email,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const userData = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <>
      <h1 className="heading" style={{ textAlign: "center" }}>
        React Table
      </h1>
      <BasicTable data={users} columns={userData} />
    </>
  );
}

export default App;
