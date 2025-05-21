import { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./App.css";
import { UseTheme } from "./context/ThemeContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const inputRef = useRef(null);

  const { darkMode, toggleTheme } = UseTheme();
  console.log("darkMode", darkMode);
  const fetchUserData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setData(res?.data);
    setFilter(res?.data);
  };

  useEffect(() => {
    if (searchTerm.trim() != "") {
      const timer = setTimeout(() => {
        setDebounceSearchTerm(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setFilter(data);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item?.id.toString().includes(debounceSearchTerm) ||
        item?.name.toLowerCase().includes(debounceSearchTerm.toLowerCase()) ||
        item?.username.toLowerCase().includes(debounceSearchTerm.toLowerCase())
    );

    setFilter(filteredData);
  }, [debounceSearchTerm]);

  useEffect(() => {
    console.log("inputRef", inputRef);
    inputRef.current.focus();
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("inputRef", inputRef);
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <div>
      <button onClick={toggleTheme}>mode</button>

      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <table style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="header-cell">id</th>
            <th className="header-cell">name</th>
            <th className="header-cell">title</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, index) => (
            <tr key={index}>
              <td className="body-cell">{item?.id}</td>
              <td className="body-cell">{item?.name}</td>
              <td className="body-cell">{item?.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
