import { useState, useEffect } from 'react';
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import ContactModal from '../modal/ContactModal';
import logo from '/assets/img/logo.png';
import logoLight from '/assets/img/logo-light.png';
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useStickyMenu from "../../hooks/useStickyMenu";

const HeaderV7 = () => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const toggleSubMenu = useSubMenuToggle();
    const isMenuSticky = useStickyMenu();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1023);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Стили для мобильной версии - шапка всегда fixed
    const mobileNavStyle = isMobile ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%'
    } : {};

    return (
        <>
            <header>
                <nav 
                    className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed ${isMenuSticky ? "sticked" : "no-background"} ${isOpen ? "navbar-responsive" : ""} `}
                    style={mobileNavStyle}
                >
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars" />
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img src={logoLight} className="logo logo-display" alt="Logo" />
                                <img src={logoLight} className="logo logo-scrolled" alt="Logo" />
                                <img src={logo} className="logo-dark" alt="Logo" />
                            </Link>
                        </div>
                        <div className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`} id="navbar-menu">
                            <img className="regular-img" src={logoLight} alt="Logo" />
                            <img className="light-img" src={logo} alt="Logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times" />
                            </button>
                            <MainMenu toggleSubMenu={toggleSubMenu} navbarPlacement='navbar-center' closeMenu={closeMenu} />
                        </div>
                        <div className="attr-right">
                            <div className="attr-nav flex">
                                <ul>
                                    <li className="button">
                                        <a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>
                                            Связаться с нами
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </>
    );
};

export default HeaderV7;