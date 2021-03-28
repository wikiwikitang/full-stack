import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch("/test");
      const data = await rawData.json();
      setData(data);
    };
    fetchData();
  }, []);
  const [data, setData] = useState(null);

  if (!data) {
    return null;
  }

  const dataSection = Object.keys(data).map((key) => {
    return (
      <div key={key}>
        {key} : {data[key]}
      </div>
    );
  });

  return <div className="App">{dataSection}</div>;
};

export default App;
