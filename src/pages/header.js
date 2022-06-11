import { Outlet, Link } from "react-router-dom";

const Header = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Intrusion Detection Application</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item active">
                            <Link to="/"> Home &nbsp; </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/about">About &nbsp; </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/contact">Contact </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <Outlet/>
        </>
    )
};

export default Header;