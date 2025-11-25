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

    // Скроллим страницу вверх при загрузке
    useEffect(() => {
        // Мгновенный скролл вверх - используем несколько методов для надежности на мобильных устройствах
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Очищаем сохраненную позицию скролла
        sessionStorage.removeItem('projectsPageScrollPosition');
        
        // Дополнительные попытки после задержки (на случай, если контент еще загружается)
        const timeout1 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
        
        const timeout2 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 300);
        
        const timeout3 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 500);
        
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
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

