/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom"; // Я ВЕРНУЛ ЭТОТ ИМПОРТ
import ModalVideo from "react-modal-video";
import { useState } from "react";

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement }: DataType) => {

    const [isOpen, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Функция для плавного скролла к элементу
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Функция для обработки клика на "Проекты" - плавный скролл к блоку на главной странице
    const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // Если мы на главной странице, просто скроллим к блоку
            const element = document.getElementById('projects');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Если мы на другой странице, переходим на главную с hash
            navigate('/#projects');
            // Ждем, чтобы страница загрузилась, затем скроллим
            setTimeout(() => {
                const element = document.getElementById('projects');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // Если элемент еще не загрузился, пробуем еще раз
                    setTimeout(() => {
                        const retryElement = document.getElementById('projects');
                        if (retryElement) {
                            retryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            }, 200);
        }
    };

    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">

                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>О нас</a>
                </li>
                <li>
                    <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')}>Услуги</a>
                </li>
                <li>
                    <a href="#projects" onClick={handleProjectsClick}>Проекты</a>
                </li>
                <li>
                    <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}>Предложения</a>
                </li>
                <li>
                    <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>Команда</a>
                </li>

                {/* ИСПРАВЛЕНИЕ: Меняем якорную ссылку на ссылку страницы */}
                <li>
                    <Link to="/blog">Блог</Link>
                </li>

                <li>
                    <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Контакты</a>
                </li>

            </ul>

            <ModalVideo channel='youtube' isOpen={isOpen} videoId="35mvh-2oII8" onClose={() => setOpen(false)} />
        </>
    );
};

export default MainMenu;