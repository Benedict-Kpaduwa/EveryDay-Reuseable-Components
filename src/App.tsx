import { useState } from "react";
import "./App.css";
import Selector from "./components/Selector";
import { pets } from "./data/data";

function App() {
  const [val, setVal] = useState("");
  const handleChange = (val: string) => {
    console.log(val);
    setVal(val);
  };
  return (
    <>
      <div>
        <h1>EveryDay Reuseable Components</h1>
        <Selector
          options={pets}
          id="id"
          label="label"
          handleChange={handleChange}
          selectedVal={val}
        />
      </div>
    </>
  );
}

export default App;
