import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navar/Navbar";
import Footer from "../Footer/Footer";

const MainLayOut = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/register')
    return (
        <div>
            {noHeaderFooter || <Navbar/>}
            <Outlet/>
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

export default MainLayOut;