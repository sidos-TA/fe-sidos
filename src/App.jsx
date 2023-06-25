import { useState } from "react";
import BtnSidos from "./lib/src/components/BtnSidos";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <BtnSidos
          onClick={() => setCount((count) => count + 1)}
          propsMobile={{ color: "primary" }}
        >
          Tes {count}
        </BtnSidos>
      </div>
    </>
  );
}

export default App;
