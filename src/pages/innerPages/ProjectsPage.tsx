import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectsGrid from "../../components/portfolio/ProjectsGrid";
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
                <Breadcrumb 
                    title='Все проекты' 
                    breadCrumb='projects'
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
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

