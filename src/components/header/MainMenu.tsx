/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom"; // Я ВЕРНУЛ ЭТОТ ИМПОРТ
import ModalVideo from "react-modal-video";
import { useState, useMemo } from "react";
import BlogV3Data from '../../../src/assets/jsonData/blog/BlogV3Data.json';

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    closeMenu?: () => void;
}

const MainMenu = ({ navbarPlacement, closeMenu }: DataType) => {

    const [isOpen, setOpen] = useState(false);
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
    const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isBlogDropdownVisible, setIsBlogDropdownVisible] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
    const [blogDropdownTimeout, setBlogDropdownTimeout] = useState<number | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Получаем все уникальные категории из данных блога
    const blogFilters = useMemo(() => {
        const tags = new Set<string>();
        BlogV3Data.forEach(blog => {
            if (blog.tag) {
                tags.add(blog.tag);
            }
        });
        const uniqueTags = Array.from(tags).sort();
        return uniqueTags.map(tag => ({ id: tag, label: tag }));
    }, []);

    // Функция для плавного скролла к элементу
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Закрываем меню сразу при клике
        if (closeMenu) {
            closeMenu();
        }
        
        // Принудительно закрываем меню через DOM
        const menuElement = document.getElementById('navbar-menu');
        if (menuElement) {
            menuElement.classList.remove('show');
        }
        document.body.classList.remove('no-fade');
        
        // Если мы не на главной странице, сначала переходим на главную
        if (location.pathname !== '/') {
            navigate(`/#${targetId}`);
            // После перехода делаем скролл
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        } else {
            // Если мы на главной странице, просто скроллим
            setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            }, 100);
        }
    };

    // Функция для обработки клика на фильтр проектов
    const handleProjectFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, filterId: string) => {
        e.preventDefault();
        // Сохраняем фильтр в sessionStorage
        sessionStorage.setItem('projectsPageActiveFilter', filterId);
        
        // Переходим на страницу проектов
        navigate('/projects');
        
        // Закрываем выпадающее меню
        setIsProjectsDropdownOpen(false);
    };

    // Функция для обработки клика на фильтр блога
    const handleBlogFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, filterId: string) => {
        e.preventDefault();
        // Сохраняем фильтр в sessionStorage
        sessionStorage.setItem('blogPageActiveFilter', filterId);
        
        // Переходим на страницу блога
        navigate('/blog');
        
        // Закрываем выпадающее меню
        setIsBlogDropdownOpen(false);
    };

    // Функция для обработки клика на "Проекты" - переходим к блоку "Недавние работы"
    const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Закрываем меню сразу при клике
        if (closeMenu) {
            closeMenu();
        }
        
        // Принудительно закрываем меню через DOM
        const menuElement = document.getElementById('navbar-menu');
        if (menuElement) {
            menuElement.classList.remove('show');
        }
        document.body.classList.remove('no-fade');
        
        // Если мы на главной странице, делаем плавный скролл к блоку projects
        if (location.pathname === '/') {
            setTimeout(() => {
            const element = document.getElementById('projects');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            }, 100);
        } else {
            // Если мы на другой странице, переходим на главную с хешем
            navigate('/#projects');
            // После перехода делаем скролл
            setTimeout(() => {
                const element = document.getElementById('projects');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
        
        // Закрываем выпадающее меню, если оно открыто
        setIsProjectsDropdownOpen(false);
        setIsDropdownVisible(false);
    };

    return (
        <>
            <style>{`
                .projects-dropdown {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                }
                .projects-dropdown.show {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
                .projects-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: 0;
                    right: 0;
                    height: 10px;
                    background: transparent;
                    pointer-events: auto;
                }
            `}</style>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">

                <li>
                    <Link to="/" onClick={() => {
                        if (closeMenu) {
                            closeMenu();
                        }
                        const menuElement = document.getElementById('navbar-menu');
                        if (menuElement) {
                            menuElement.classList.remove('show');
                        }
                        document.body.classList.remove('no-fade');
                    }}>Главная</Link>
                </li>
                <li>
                    <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>О нас</a>
                </li>
                <li>
                    <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')}>Услуги</a>
                </li>
                <li 
                    className="dropdown"
                    onMouseEnter={() => {
                        if (dropdownTimeout) {
                            clearTimeout(dropdownTimeout);
                            setDropdownTimeout(null);
                        }
                        setIsProjectsDropdownOpen(true);
                        // Небольшая задержка для плавной анимации появления
                        setTimeout(() => {
                            setIsDropdownVisible(true);
                        }, 10);
                    }}
                    onMouseLeave={(e) => {
                        // Проверяем, не переходим ли мы на выпадающее меню
                        const relatedTarget = e.relatedTarget as HTMLElement;
                        if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
                            return;
                        }
                        setIsDropdownVisible(false);
                        const timeout = setTimeout(() => {
                            setIsProjectsDropdownOpen(false);
                        }, 300);
                        setDropdownTimeout(timeout);
                    }}
                    style={{ position: 'relative' }}
                >
                    <a href="#projects" onClick={(e) => {
                        handleProjectsClick(e);
                        if (closeMenu) closeMenu();
                    }}>
                        Проекты
                    </a>
                    {isProjectsDropdownOpen && (
                        <ul 
                            className={`dropdown-menu projects-dropdown ${isDropdownVisible ? 'show' : ''}`}
                            onMouseEnter={() => {
                                if (dropdownTimeout) {
                                    clearTimeout(dropdownTimeout);
                                    setDropdownTimeout(null);
                                }
                                setIsDropdownVisible(true);
                            }}
                            onMouseLeave={(e) => {
                                // Проверяем, не переходим ли мы обратно на родительский элемент
                                const relatedTarget = e.relatedTarget as HTMLElement;
                                if (relatedTarget && e.currentTarget.closest('li.dropdown')?.contains(relatedTarget)) {
                                    return;
                                }
                                setIsDropdownVisible(false);
                                const timeout = setTimeout(() => {
                                    setIsProjectsDropdownOpen(false);
                                }, 300);
                                setDropdownTimeout(timeout);
                            }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                marginTop: '5px',
                                background: 'rgba(42, 45, 50, 0.8)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                minWidth: '200px',
                                padding: '15px 0 10px 0',
                                margin: 0,
                                listStyle: 'none',
                                zIndex: 1000,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px'
                            }}
                        >
                            <li>
                                <a 
                                    href="/projects" 
                                    onClick={(e) => {
                                        handleProjectFilterClick(e, 'Сайты');
                                        if (closeMenu) closeMenu();
                                    }}
                                    style={{
                                        display: 'block',
                                        padding: '10px 20px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        transition: 'background 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    Сайты
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/projects" 
                                    onClick={(e) => {
                                        handleProjectFilterClick(e, 'Мобильные приложения');
                                        if (closeMenu) closeMenu();
                                    }}
                                    style={{
                                        display: 'block',
                                        padding: '10px 20px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        transition: 'background 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    Мобильные приложения
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/projects" 
                                    onClick={(e) => {
                                        handleProjectFilterClick(e, 'UI/UX');
                                        if (closeMenu) closeMenu();
                                    }}
                                    style={{
                                        display: 'block',
                                        padding: '10px 20px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        transition: 'background 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    UI/UX
                                </a>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}>Предложения</a>
                </li>
                <li>
                    <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>Команда</a>
                </li>

                {/* ИСПРАВЛЕНИЕ: Меняем якорную ссылку на ссылку страницы */}
                <li 
                    className="dropdown"
                    onMouseEnter={() => {
                        if (blogDropdownTimeout) {
                            clearTimeout(blogDropdownTimeout);
                            setBlogDropdownTimeout(null);
                        }
                        setIsBlogDropdownOpen(true);
                        // Небольшая задержка для плавной анимации появления
                        setTimeout(() => {
                            setIsBlogDropdownVisible(true);
                        }, 10);
                    }}
                    onMouseLeave={(e) => {
                        // Проверяем, не переходим ли мы на выпадающее меню
                        const relatedTarget = e.relatedTarget as HTMLElement;
                        if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
                            return;
                        }
                        setIsBlogDropdownVisible(false);
                        const timeout = setTimeout(() => {
                            setIsBlogDropdownOpen(false);
                        }, 300);
                        setBlogDropdownTimeout(timeout);
                    }}
                    style={{ position: 'relative' }}
                >
                    <Link 
                        to="/blog" 
                        onClick={(e) => {
                            e.preventDefault();
                            // Очищаем фильтр при клике на "Блог", чтобы показать все статьи
                            sessionStorage.removeItem('blogPageActiveFilter');
                            if (closeMenu) {
                                closeMenu();
                            }
                            // Принудительно закрываем меню через DOM
                            const menuElement = document.getElementById('navbar-menu');
                            if (menuElement) {
                                menuElement.classList.remove('show');
                            }
                            document.body.classList.remove('no-fade');
                            navigate('/blog');
                        }}
                    >
                        Блог
                    </Link>
                    {isBlogDropdownOpen && (
                        <ul 
                            className={`dropdown-menu projects-dropdown ${isBlogDropdownVisible ? 'show' : ''}`}
                            onMouseEnter={() => {
                                if (blogDropdownTimeout) {
                                    clearTimeout(blogDropdownTimeout);
                                    setBlogDropdownTimeout(null);
                                }
                                setIsBlogDropdownVisible(true);
                            }}
                            onMouseLeave={(e) => {
                                // Проверяем, не переходим ли мы обратно на родительский элемент
                                const relatedTarget = e.relatedTarget as HTMLElement;
                                if (relatedTarget && e.currentTarget.closest('li.dropdown')?.contains(relatedTarget)) {
                                    return;
                                }
                                setIsBlogDropdownVisible(false);
                                const timeout = setTimeout(() => {
                                    setIsBlogDropdownOpen(false);
                                }, 300);
                                setBlogDropdownTimeout(timeout);
                            }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                marginTop: '5px',
                                background: 'rgba(42, 45, 50, 0.8)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                minWidth: '200px',
                                padding: '15px 0 10px 0',
                                margin: 0,
                                listStyle: 'none',
                                zIndex: 1000,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px'
                            }}
                        >
                            {blogFilters.map((filter) => (
                                <li key={filter.id}>
                                    <a 
                                        href="/blog" 
                                        onClick={(e) => {
                                            handleBlogFilterClick(e, filter.id);
                                            if (closeMenu) closeMenu();
                                        }}
                                        style={{
                                            display: 'block',
                                            padding: '10px 20px',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            transition: 'background 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {filter.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
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