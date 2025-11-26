/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";

interface DataType {
    toggleSubMenu2?: (event: React.MouseEvent<HTMLElement>) => void;
    closeInfoBar?: () => void;
}

const MainMenuV2 = ({ toggleSubMenu2: _toggleSubMenu2, closeInfoBar }: DataType) => {
    // toggleSubMenu2 is passed but not used - kept for compatibility
    const location = useLocation();
    const navigate = useNavigate();

    // Функция для плавного скролла к элементу
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        
        if (location.pathname !== '/') {
            navigate(`/#${targetId}`);
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Закрываем меню после перехода
        if (closeInfoBar) closeInfoBar();
    };


    // Функция для обработки клика на "Проекты"
    const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById('projects');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate('/#projects');
            setTimeout(() => {
                const element = document.getElementById('projects');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
        if (closeInfoBar) closeInfoBar();
    };

    // Функция для обработки клика на "Блог"
    const handleBlogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/blog');
        if (closeInfoBar) closeInfoBar();
    };


    return (
        <>
            <ul className="simple-menu-list">
                <li>
                    <Link to="/" onClick={closeInfoBar}>Главная</Link>
                </li>
                <li>
                    <Link to="#" onClick={(e) => handleSmoothScroll(e, 'about')}>О Нас</Link>
                </li>
                <li>
                    <Link to="/services" onClick={closeInfoBar}>Услуги</Link>
                </li>
                <li>
                    <Link to="#" onClick={handleProjectsClick}>Проекты</Link>
                </li>
                <li>
                    <Link to="#" onClick={(e) => handleSmoothScroll(e, 'pricing')}>Предложения</Link>
                </li>
                <li>
                    <Link to="#" onClick={(e) => handleSmoothScroll(e, 'team')}>Команда</Link>
                        </li>
                <li>
                    <Link to="#" onClick={handleBlogClick}>Блог</Link>
                </li>
                <li>
                    <Link to="#" onClick={(e) => handleSmoothScroll(e, 'contact')}>Контакты</Link>
                </li>
            </ul>
        </>
    );
};

export default MainMenuV2;