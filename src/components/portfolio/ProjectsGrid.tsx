import { Link } from "react-router-dom";
import PortfolioV1Data from '../../../src/assets/jsonData/portfolio/PortfolioV1Data.json';

interface DataType {
    id?: number;
    thumb?: string;
    text?: string;
    textBold?: string;
    tag?: string;
    category?: string;
    description?: string;
    backgroundColor?: string;
}

interface ProjectsGridProps {
    filterCategory?: string;
}

const SingleProjectGrid = ({ project, activeFilter }: { project: DataType; activeFilter?: string }) => {
    const { id, thumb, text, textBold, tag, description, backgroundColor } = project;

    // Сохранение позиции скролла перед переходом
    const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Сохраняем позицию скролла
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem('projectsPageScrollPosition', scrollPosition.toString());
        // Сохраняем активный фильтр
        if (activeFilter) {
            sessionStorage.setItem('projectsPageActiveFilter', activeFilter);
        }
    };

    const imageSrc = thumb && (thumb.startsWith('мобильнык/') || thumb.startsWith('ux ui/') || thumb.startsWith('сайт/') || thumb.startsWith('бренд/')) 
        ? `/assets/${thumb}` 
        : `/assets/img/portfolio/${thumb}`;

    return (
        <>
            <div className="col-lg-4 col-md-6 item portfolio-col-no-padding">
                <div className="portfolio-style-two-new">
                    <div className="portfolio-card-wrapper">
                        <div className="portfolio-logo-container">
                            <div 
                                className="portfolio-logo-bg"
                                style={{ backgroundColor: backgroundColor || '#f5f5f5' }}
                            />
                            <img
                                className="portfolio-logo"
                                src={imageSrc}
                                alt={`${text} ${textBold}`}
                            />
                        </div>
                        <div className="portfolio-hover-overlay">
                            <div className="portfolio-hover-content">
                                {tag && (
                                    <div className="pf-tags">
                                        <span>{tag}</span>
                                    </div>
                                )}
                                {description && (
                                    <p className="portfolio-description">{description}</p>
                                )}
                                <Link 
                                    to={`/project/${id}`} 
                                    className="btn-animation portfolio-view-btn"
                                    onClick={handleProjectClick}
                                >
                                    <i className="fas fa-arrow-right" />
                                    <span>Смотреть на сайте</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ProjectsGrid = ({ filterCategory = "all" }: ProjectsGridProps) => {
    const filteredProjects = filterCategory === "all" 
        ? PortfolioV1Data 
        : PortfolioV1Data.filter(project => project.category === filterCategory);

    return (
        <>
            <div className="portfolio-grid-fullwidth">
                <div className="row portfolio-row-no-gutter">
                    {filteredProjects.map(project =>
                        <SingleProjectGrid project={project} key={project.id} activeFilter={filterCategory} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectsGrid;

