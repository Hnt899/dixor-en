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
                <div className="breadcrumb-area portfolio-page-no-gradient" style={{ 
                    backgroundImage: `url(/assets/img/shape/10.jpg)`,
                    paddingTop: '350px',
                    paddingBottom: '80px',
                    position: 'relative'
                }}>
                    <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />
                    <div className="container">
                        <div className="breadcrumb-item" style={{ padding: 0 }}>
                            <div className="row">
                                <div className="col-lg-12" style={{ textAlign: 'left' }}>
                                    <h1 style={{ 
                                        fontSize: '120px',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif',
                                        color: '#FFFFFF',
                                        lineHeight: '1',
                                        marginBottom: '60px',
                                        marginTop: '-100px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '-2px'
                                    }}>
                                        ПОРТФОЛИО
                                    </h1>
                                    <p style={{ 
                                        color: '#FFFFFF', 
                                        fontSize: '32px', 
                                        lineHeight: '1.6', 
                                        margin: 0,
                                        marginBottom: '120px',
                                        fontWeight: '400',
                                        letterSpacing: '0',
                                        maxWidth: '800px',
                                        marginLeft: '600px'
                                    }}>
                                        За 5 лет мы реализовали свыше 200<br />
                                        проектов. Ниже представлены некоторые<br />
                                        из наших работ
                                    </p>
                                    
                                    {/* Фильтры */}
                                    {onFilterChange && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: '15px',
                                            marginTop: '80px'
                                        }}>
                                            <ul style={{
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
                                                                border: '2px solid var(--color-primary, #C9F31D)',
                                                                background: activeFilter === filter.id ? 'var(--color-primary, #C9F31D)' : 'transparent',
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
                                                                    e.currentTarget.style.background = 'rgba(201, 243, 29, 0.1)';
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