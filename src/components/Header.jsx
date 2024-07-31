import { React, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


function Header() {
    const changeTheme = () => {
        document.body.classList.contains('dark') ? document.body.classList.remove('dark') : document.body.classList.add('dark');
    }

    const [hamburgerState, setHamburgerState] = useState('');
    const navLinkClick = (a) => {
        if(a) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');

        if(hamburgerState === 'active') setHamburgerState('')
    }

    if(document.location.hash === "#/" || document.location.hash
=== "") document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');

    
    const classNavOverlay = 'nav-overlay ' + hamburgerState;
    const classHamburger = 'btn btn-hamburger ' + hamburgerState;

    const hamburgerClick = () => {
        hamburgerState === '' ? setHamburgerState('active') : setHamburgerState('');
    }


	return (
		<header className="container align-items-center">
        <Link to="/" onClick={() => navLinkClick(1)} className="flex gap-10 align-items-center">
            <div className="logo" />
        </Link>
        <div className={classNavOverlay} onClick={hamburgerClick}/>
        <nav className={hamburgerState}>
            <NavLink to="/" data-menu="Home" onClick={() => navLinkClick(1)}>Home</NavLink>
            <NavLink to="/about" data-menu="About" onClick={() => navLinkClick()}>About</NavLink>
            <NavLink to="/projects" data-menu="Projects" onClick={() => navLinkClick()}>Projects</NavLink>
            <NavLink to="/contacts" data-menu="Contacts" onClick={() => navLinkClick()}>Contacts</NavLink>
            <div className="switch-theme hidden">
                <button className="btn change-theme" onClick={changeTheme}>
                    <svg className="change-theme-light">
                        <use xlinkHref="#svgsprite-theme-light" />
                    </svg>
                    <svg className="change-theme-dark">
                        <use xlinkHref="#svgsprite-theme-dark" />
                    </svg>
                </button>
          </div>
        </nav>
        <button className="btn change-theme" onClick={changeTheme}>
            <svg className="change-theme-light">
                <use xlinkHref="#svgsprite-theme-light" />
            </svg>
            <svg className="change-theme-dark">
                <use xlinkHref="#svgsprite-theme-dark" />
            </svg>
        </button>
        <button className={classHamburger} onClick={hamburgerClick}>
            <svg width={24} height={24} viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 5.75H19.25" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 18.25H19.25" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 12H19.25" />
            </svg>
        </button>
      </header>
	);
}

export default Header;
