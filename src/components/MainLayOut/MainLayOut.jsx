import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navar/Navbar";
import Footer from "../Footer/Footer";

const MainLayOut = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayOut;