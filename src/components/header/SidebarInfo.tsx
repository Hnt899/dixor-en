import SocialShareV3 from '../social/SocialShareV3';
import { Link } from "react-router-dom";
import HeaderNewsLetter from './HeaderNewsLetter';
import logoLight from '/assets/img/logo-light.png';

interface SidebarInfoProps {
    openInfoBar?: () => void;
    isInfoOpen?: boolean;
    closeInfoBar?: () => void;
    contactButton?: React.ReactNode;
}

const SidebarInfo = ({ openInfoBar, isInfoOpen, closeInfoBar, contactButton }: SidebarInfoProps) => {
    return (
        <>
            <div className="attr-right">
                <div className="attr-nav flex">
                    <ul>
                        {contactButton}
                        <li className="side-menu">
                            <Link to="#" onClick={openInfoBar}>
                                <span className="bar-1" />
                                <span className="bar-2" />
                                <span className="bar-3" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={`side ${isInfoOpen ? "on" : ""}`}>
                    <Link to="#" className="close-side" onClick={closeInfoBar}><i className="fa fa-times"></i></Link>
                    <div className="top">
                        <div className="widget">
                            <div className="logo">
                                <img src={logoLight} alt="Logo" />
                            </div>
                        </div>
                        <div className="widget address">
                            <div>
                                <ul>
                                    <li>
                                        <div className="content">
                                            <p>Адрес</p>
                                            <strong>Улица Сумская 168 офис 306, Белгород</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <p>Почта</p>
                                            <strong>demyanovcdi@mail.ru</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <p>Контакты</p>
                                            <strong>+7 985 365 6294</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="widget newsletter">
                            <h4 className="title">Оставьте почту</h4>
                            <HeaderNewsLetter />
                        </div>
                        <div className="widget social">
                            <ul className="link">
                                <SocialShareV3 />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarInfo;