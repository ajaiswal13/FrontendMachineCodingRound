import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
const Navbar = () => {

    const { toggleTheme } = useContext(ThemeContext);
    return (
        <nav style={{width: "500px"}}>
            <ul style={{display:"flex", justifyContent:"space-between"}}>
                <li><Link to="/"> Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <button onClick={() => toggleTheme()}>Change Theme</button>
            </ul>
        </nav>
    )
}

export default Navbar;