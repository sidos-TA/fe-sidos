import { Form } from "antd";
import TableSidos from "./lib/src/components/TableSidos";
import { useEffect } from "react";
import useFetch from "./lib/src/helpers/useFetch";
import BtnSidos from "./lib/src/components/BtnSidos";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const fetch = useFetch();
  const fetchData = () => {
    fetch({
      endpoint: "getAllMhs",
    })
      .then((res) => {
        console.log("res : ", res);
      })
      .catch((er) => {
        console.log("er : ", er);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BtnSidos onClick={() => navigate("/usulan")}>Tes</BtnSidos>

      <TableSidos />
    </>
  );
}

export default App;
