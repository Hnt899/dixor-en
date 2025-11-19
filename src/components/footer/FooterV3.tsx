import { Link } from "react-router-dom"; // Link все еще нужен для копирайта (если хочешь)
import NewsletterV2 from '../newsletter/NewsletterV2';
import FooterSocial from '../social/FooterSocial';

const FooterV3 = () => {
    return (
        <>
            <footer>
                <div className="footer-box">
                    <div className="container">
                        <div className="f-items">
                            <div className="row">
                                <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15 pr-md-15 pr-xs-15">
                                    <div className="top">
                                        <h2>Нужна поддержка?</h2>
                                        {/* ИСПРАВЛЕНИЕ: Кнопка-стрелка теперь ведет к блоку #contact */}
                                        <a className="quick-btn" href="#contact">
                                            <i className="fas fa-long-arrow-right" />
                                        </a>
                                    </div>
                                    <ul className="address-list">
                                        <li>
                                            <h4>Главный офис (Белгород)</h4>
                                            <p>
                                                {/* Впиши свой адрес сюда */}
                                                Улица Сумская 168 офис 306
                                            </p>
                                        </li>
                                        <li>
                                            <h4>Филиал (Дубай)</h4>
                                            <p>
                                                {/* Впиши свой адрес сюда */}
                                                Sheikh Mohammed bin Salah, #234 B - Downtown - Dubai
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-5 offset-lg-1 footer-item">
                                    <h4 className="widget-title">Полезные ссылки</h4>
                                    <ul className="useful-link">
                                        {/* ИСПРАВЛЕНИЕ: Заменил Link на <a>, чтобы они вели на якоря */}
                                        <li><a href="#about">О нас</a></li>
                                        <li><a href="#contact">Контакты</a></li>
                                        <li><a href="#services">Услуги</a></li>
                                        <li><a href="#projects">Проекты</a></li>
                                        <li><a href="#team">Команда</a></li>
                                        <li><a href="#blog">Блог</a></li>
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
        </>
    );
};

export default FooterV3;