import { Link } from "react-router-dom";

interface DataType {
    title?: string;
    breadCrumb?: string;
    activeFilter?: string;
    onFilterChange?: (category: string) => void;
}

const Breadcrumb = ({ title, breadCrumb, activeFilter, onFilterChange }: DataType) => {
    if (title === 'Все проекты') {
        const filters = [
            { id: "all", label: "Все проекты" },
            { id: "Сайты", label: "Сайты" },
            { id: "Мобильные приложения", label: "Мобильные приложения" },
            { id: "UI/UX", label: "UI/UX" }
        ];

        return (
            <>
                <div className="breadcrumb-area portfolio-page-no-gradient portfolio-breadcrumb-custom" style={{ 
                    backgroundImage: `url(/assets/img/shape/10.jpg)`,
                    paddingTop: '350px',
                    paddingBottom: '80px',
                    position: 'relative'
                }}>
                    <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />
                    <div className="container">
                        <div className="breadcrumb-item" style={{ padding: 0 }}>
                            <div className="row">
                                <div className="col-lg-12 portfolio-breadcrumb-content">
                                    <h1 className="portfolio-breadcrumb-title">
                                        ПОРТФОЛИО
                                    </h1>
                                    <p className="portfolio-breadcrumb-description">
                                        За 5 лет мы реализовали свыше 200<br />
                                        проектов. Ниже представлены некоторые<br />
                                        из наших работ
                                    </p>
                                    
                                    {/* Фильтры */}
                                    {onFilterChange && (
                                        <div className="portfolio-breadcrumb-filters">
                                            <ul className="portfolio-filters-list">
                                                {filters.map((filter) => (
                                                    <li key={filter.id}>
                                                        <button
                                                            className={`portfolio-filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                                                            onClick={() => onFilterChange(filter.id)}
                                                            onMouseEnter={(e) => {
                                                                if (activeFilter !== filter.id) {
                                                                    e.currentTarget.style.background = 'rgba(201, 243, 29, 0.1)';
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (activeFilter !== filter.id) {
                                                                    e.currentTarget.style.background = '';
                                                                }
                                                                // Для активной кнопки не меняем стили
                                                            }}
                                                        >
                                                            {filter.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={`breadcrumb-area text-center`}
                style={{ backgroundImage: `url(/assets/img/shape/10.jpg)` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />

                <div className="container">
                    <div className="breadcrumb-item">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <h1>{title ? title : "not found"}</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to="/"><i className="fas fa-home" /> Главная</Link></li>
                                        <li className="active">{breadCrumb ? (breadCrumb === 'projects' ? 'Продукты' : breadCrumb) : "error"}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Breadcrumb;