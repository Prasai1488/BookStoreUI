import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";

const App = () => {
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
};

export default App;
