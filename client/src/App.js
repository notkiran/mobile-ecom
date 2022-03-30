import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PhoneList />
    </div>
  );
}

function PhoneList() {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/mobiles")
      .then((res) => res.json())
      .then((data) => {
        setMobiles(data);
      });
  }, []);

  return (
    <div>
      <h1>Mobile List</h1>
      <div className="mobile-list-container">
        {mobiles.map((mobile) => (
          <Phone key={mobile.model} mobile={mobile} />
        ))}
      </div>
    </div>
  );
}

function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img src={mobile.img} alt="mobile-img" className="phone-picture" />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="company-name">{mobile.company}</p>
    </div>
  );
}

export default App;
