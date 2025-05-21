import { useEffect, useRef, useState } from "react";

import "./App.css";
import { UseTheme } from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./store/MainSlice";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const data2 = useSelector((state) => state?.main?.data);

  console.log("data22222", data2);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const { darkMode, toggleTheme } = UseTheme();
  console.log("darkMode", darkMode);
  const fetchUserData = async () => {
    await dispatch(getData())
      .unwrap()
      .then((res) => {
        console.log(res);
        setData(res);
        setFilter(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
