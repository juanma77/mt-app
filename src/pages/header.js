import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Aplicación de Detección de Intrusos</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/"> Inicio &nbsp; </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">Acerca De &nbsp; </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact">Contacto </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <Outlet/>
        </>
    )
};

export default Header;