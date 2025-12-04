import { trackClick } from "../../utils/yandex-metrika";

const ProjectIdeaV1 = () => {
    return (
        <>
            <div className="container">
                <div className="row project-idea-row">
                    <div className="col-lg-7 project-idea-text" style={{ transform: 'translate(12%, 25%)' }}>
                        <h4 className="sub-title">Есть идея для проекта?</h4>
                        <h2 className="title">Для быстрой связи <br /> Напишите или позвоните нам</h2>
                        <ul className="contact-list">
                            <li>
                                <div className="icon">
                                    <i className="fas fa-phone" />
                                </div>
                                <div className="info">
                                    <h4>Телефон</h4>
                                    <a 
                                        className="phone-link" 
                                        href="tel:+79853656294"
                                        onClick={() => {
                                            // Отслеживание клика на телефон в Яндекс.Метрике
                                            trackClick('phone_click', 'link', {
                                                action: 'call_phone',
                                                phone: '+79853656294',
                                                location: 'project_idea',
                                            });
                                        }}
                                    >
                                        +7 985 365 6294
                                    </a> <br />
                                </div>
                            </li>
                            <li>
                                <div className="icon">
                                    <i className="fas fa-envelope-open" />
                                </div>
                                <div className="info">
                                    <h4>Официальная почта</h4>
                                    <a href="mailto:demyanovcdi@mail.ru">demyanovcdi@mail.ru</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-5 project-idea-image" style={{ position: 'relative', height: '100vh', minHeight: '800px' }}>
                        <div className="thumb" style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'visible'
                        }}>
                            <img 
                                src="/assets/img/телефон.png" 
                                alt="Телефон" 
                                className="project-idea-phone-img"
                                style={{ 
                                    transform: 'translateX(32%) scaleX(1.4) scaleY(1.5)',
                                    display: 'block',
                                    height: '100%',
                                    width: 'auto',
                                    minHeight: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    transformOrigin: 'center top'
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectIdeaV1;