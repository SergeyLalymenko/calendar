import { NavLink } from 'react-router-dom';
import logoImg from '@/assets/general/logo.svg';
import './Header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__wrapper wrapper">
                <div className="header__box">
                    <NavLink to="/" className="header__logo">
                        <img className="header__logo-image" src={logoImg} />
                    </NavLink>
                    <div className="header__navigation">
                        <NavLink to="/calendar" className="header__navigation-item">
                            Calendar
                        </NavLink>
                        <NavLink to="/events" className="header__navigation-item">
                            Events
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
