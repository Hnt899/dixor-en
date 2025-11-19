import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectsGrid from "../../components/portfolio/ProjectsGrid";
import ProjectFilters from "../../components/portfolio/ProjectFilters";
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";
import { useState, useEffect } from "react";

const ProjectsPage = () => {
    // Восстанавливаем активный фильтр из sessionStorage
    const savedFilter = sessionStorage.getItem('projectsPageActiveFilter') || "all";
    const [activeFilter, setActiveFilter] = useState(savedFilter);

    // Восстановление позиции скролла при монтировании компонента
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem('projectsPageScrollPosition');
        
        if (savedScrollPosition) {
            // Используем несколько попыток для надежного восстановления позиции
            const restoreScroll = () => {
                const scrollPos = parseInt(savedScrollPosition, 10);
                window.scrollTo({
                    top: scrollPos,
                    behavior: 'auto' // Мгновенный скролл, без анимации
                });
                
                // Проверяем, что скролл действительно произошел
                // Если нет, пытаемся еще раз через небольшую задержку
                setTimeout(() => {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (Math.abs(currentScroll - scrollPos) > 10) {
                        window.scrollTo({
                            top: scrollPos,
                            behavior: 'auto'
                        });
                    }
                }, 50);
                
                // Очищаем сохраненную позицию после восстановления
                sessionStorage.removeItem('projectsPageScrollPosition');
            };

            // Задержка для того, чтобы контент успел отрендериться
            // Используем requestAnimationFrame для более плавного восстановления
            const timeoutId = setTimeout(() => {
                requestAnimationFrame(() => {
                    restoreScroll();
                });
            }, 150);
            
            return () => clearTimeout(timeoutId);
        }
    }, []);

    // Восстанавливаем активный фильтр при монтировании
    useEffect(() => {
        if (savedFilter && savedFilter !== activeFilter) {
            setActiveFilter(savedFilter);
        }
        // Очищаем сохраненный фильтр после восстановления
        sessionStorage.removeItem('projectsPageActiveFilter');
    }, []);

    return (
        <>
            <Helmet>
                <title>CDI - Все проекты</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Все проекты' breadCrumb='projects' />
                
                {/* Описание портфолио */}
                <div className="default-padding" style={{ backgroundColor: '#0E0F11', paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 text-center">
                                <p style={{ 
                                    color: '#fff', 
                                    fontSize: '22px', 
                                    lineHeight: '1.9', 
                                    margin: 0,
                                    fontWeight: '300',
                                    letterSpacing: '0.3px'
                                }}>
                                    Это наше <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>портфолио</span> — познакомьтесь с ним. Мы создаем <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>цифровые решения полного цикла</span>, 
                                    объединяя креативность, технологичность и измеримый результат. Более <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>100+</span> успешно реализованных 
                                    проектов в различных сферах: от <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>веб-разработки</span> и <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>мобильных приложений</span> до <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>брендинга</span> и <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>UI/UX дизайна</span>. 
                                    Каждый проект — это <span style={{ color: 'var(--color-primary, #C9F31D)', fontWeight: '600' }}>уникальное решение</span>, созданное с учетом потребностей клиента и современных трендов.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Фильтры */}
                <ProjectFilters 
                    onFilterChange={setActiveFilter} 
                    activeFilter={activeFilter} 
                />
                
                {/* Сетка проектов */}
                <div className="portfolio-style-two-area portfolio-fullwidth-area">
                    <ProjectsGrid filterCategory={activeFilter} />
                </div>
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ProjectsPage;

