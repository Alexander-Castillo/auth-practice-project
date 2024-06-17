import { Link } from "react-router-dom";
import { useUserInfo } from "../Hooks/useUserInfo";
import PropTypes from 'prop-types'


// eslint-disable-next-line react/prop-types
export const Navbar = ({handleLogout}) => {
    const infoUser = useUserInfo();

    return (
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Bienvenido {infoUser?`${infoUser.name}`: 'Cargando...'}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/chat'>Chat</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={handleLogout}>Cerrar Sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    )
};
Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired
}
