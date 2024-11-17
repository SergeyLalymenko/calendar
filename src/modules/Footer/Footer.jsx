import { NavLink } from 'react-router-dom';
import logoImg from '@/assets/general/logo.svg';
import './Footer.scss';

function Header() {
    return (
        <footer className="footer">
            <div className="footer__wrapper wrapper">
                <div className="footer__box">
                    <NavLink to="/" className="footer__logo">
                        <img className="footer__logo-image" src={logoImg} />
                    </NavLink>
                    <div className="footer__navigation">
                        <NavLink to="/calendar" className="footer__navigation-item">
                            Calendar
                        </NavLink>
                        <NavLink to="/events" className="footer__navigation-item">
                            Events
                        </NavLink>
                    </div>
                    <p className="footer__rights">
                        © 2022 All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Header;
