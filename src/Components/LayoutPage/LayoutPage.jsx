import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
const LayoutPage = () => {
  return (
    <>
      <div className="container">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default LayoutPage;
