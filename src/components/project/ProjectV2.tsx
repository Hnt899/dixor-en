import SplitText from "../animation/SplitText.jsx"
import PortfolioV1 from "../portfolio/PortfolioV1";
import { Link } from "react-router-dom";

const ProjectV2 = () => {
    return (
        <>
            <div className="project-style-one-area default-padding blurry-shape-left overflow-hidden">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-4 pr-50 pr-md-15 pr-xs-15">
                            <div className="portfolio-style-one-left-info">
                                <h4 className="sub-title">Недавние работы</h4>
                                <p className="split-text">
                                    <SplitText
                                        delay={5}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Мы создаём цифровые решения полного цикла — от брендинга и дизайна до моушн‑графики и веб‑разработки. В каждом кейсе соединяем эстетику, технологичность и измеримый результат.
                                    </SplitText>
                                </p>
                                <div className="portfolio-info-card">
                                    <h5>Идеальное сочетание креативности и функциональности</h5>
                                </div>
                                <div className="mt-30">
                                    <Link className="btn-animation" to="/projects">
                                        <span>Смотреть все проекты</span>
                                        <i className="fas fa-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <PortfolioV1 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectV2;