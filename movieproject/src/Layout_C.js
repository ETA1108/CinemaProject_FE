import { Outlet } from "react-router-dom";
import Header from "./components/Header_C";

const Layout_C = () => {
  return (
    <div>
      <header style={{ position: "fixed", width: "100vw" }}>
        <Header />
      </header>
      <main style={{ paddingTop: "20px", width: "100vw" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout_C;
