import {Link} from "react-router-dom";

const LeftNavBar = () =>{
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/">Inventory</Link>
                </li>
                <li>
                    <Link to="/">Reports</Link>
                </li>
                <li>
                    <Link to="/">Notice</Link>
                </li>
                <li>
                    <Link to="/">Profile</Link>
                </li>
                <li>
                    <Link to="/">Guide</Link>
                </li>
                <li>
                    <Link to="/">Contact Us</Link>
                </li>
                <li>
                    <Link to="/">Settings</Link>
                </li>
                <li>
                    <Link to="/">Log Out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default LeftNavBar;