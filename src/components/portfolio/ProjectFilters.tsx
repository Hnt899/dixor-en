interface ProjectFiltersProps {
    onFilterChange: (category: string) => void;
    activeFilter: string;
}

const ProjectFilters = ({ onFilterChange, activeFilter }: ProjectFiltersProps) => {
    const filters = [
        { id: "all", label: "Все проекты" },
        { id: "Сайты", label: "Сайты" },
        { id: "Мобильные приложения", label: "Мобильные приложения" },
        { id: "UI/UX", label: "UI/UX" }
    ];

    return (
        <>
            <div className="portfolio-filters" style={{
                paddingTop: '80px',
                paddingBottom: '80px'
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="filter-menu" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '15px'
                            }}>
                                <ul className="filter-button-group" style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}>
                                    {filters.map((filter) => (
                                        <li key={filter.id} style={{ margin: 0 }}>
                                            <button
                                                className={activeFilter === filter.id ? "active" : ""}
                                                onClick={() => onFilterChange(filter.id)}
                                                style={{
                                                    padding: '10px 25px',
                                                    border: '2px solid var(--color-primary, #007bff)',
                                                    background: activeFilter === filter.id ? 'var(--color-primary, #007bff)' : 'transparent',
                                                    color: activeFilter === filter.id ? '#000' : '#fff',
                                                    borderRadius: '30px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    outline: 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (activeFilter !== filter.id) {
                                                        e.currentTarget.style.background = 'rgba(0, 123, 255, 0.1)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (activeFilter !== filter.id) {
                                                        e.currentTarget.style.background = 'transparent';
                                                    }
                                                }}
                                            >
                                                {filter.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectFilters;

