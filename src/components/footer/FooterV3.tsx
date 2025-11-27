import { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsletterV2 from '../newsletter/NewsletterV2';
import FooterSocial from '../social/FooterSocial';
import ContactModal from '../modal/ContactModal';

const FooterV3 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <footer id="footer">
                <div className="footer-box">
                    <div className="container">
                        <div className="f-items">
                            <div className="row">
                                <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15 pr-md-15 pr-xs-15">
                                    <div className="top">
                                        <h2>Нужна поддержка?</h2>
                                        <a className="quick-btn" href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>
                                            <i className="fas fa-long-arrow-right" />
                                        </a>
                                    </div>
                                    <ul className="address-list">
                                        <li>
                                            <h4>Главный офис (Белгород)</h4>
                                            <p>
                                                Улица Сумская 168 офис 306
                                            </p>
                                        </li>
                                        <li>
                                            <h4>Филиал (Дубай)</h4>
                                            <p>
                                                Sheikh Mohammed bin Salah, #234 B - Downtown - Dubai
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-5 offset-lg-1 footer-item">
                                    <h4 className="widget-title">Полезные ссылки</h4>
                                    <ul className="useful-link">
                                        <li><Link to="/#about">О нас</Link></li>
                                        <li><Link to="/#contact">Контакты</Link></li>
                                        <li><Link to="/#services">Услуги</Link></li>
                                        <li><Link to="/#projects">Проекты</Link></li>
                                        <li><Link to="/#team">Команда</Link></li>
                                        <li><Link to="/#blog">Блог</Link></li>
                                    </ul>
                                    {/* Форма "Your Email" находится в этом компоненте */}
                                    <NewsletterV2 />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="footer-social">
                                        <FooterSocial />
                                    </ul>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <p>
                                        {/* ИСПРАВЛЕНИЕ: Заменил Dixor на CDI */}
                                        Copyright &copy; {(new Date().getFullYear())} CDI. Все права защищены
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default FooterV3;