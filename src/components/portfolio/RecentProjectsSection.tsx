import SplitText from "../animation/SplitText.jsx"
import PortfolioV1 from "../portfolio/PortfolioV1";
import { Link } from "react-router-dom";
import { useState } from "react";
import PortfolioV1Data from "../../assets/jsonData/portfolio/PortfolioV1Data.json";

// Функция для генерации уникального текста на основе проекта
const getProjectText = (project: typeof PortfolioV1Data[0] | null) => {
    if (!project || !project.description) {
        return "Мы создаём цифровые решения полного цикла — от брендинга и дизайна до моушн‑графики и веб‑разработки. В каждом кейсе соединяем эстетику, технологичность и измеримый результат.";
    }
    
    // Используем description проекта как основу для текста
    const baseText = project.description;
    const targetLength = 200; // Примерная длина оригинального текста
    
    // Если описание короткое, расширяем его до нужного размера
    if (baseText.length < targetLength) {
        const additionalText = " Разработанный интерфейс обеспечивает удобство использования и эффективность. Мы применяем современные технологии и лучшие практики для создания решений, которые приносят измеримый результат.";
        const fullText = baseText + additionalText;
        
        // Если все еще коротко, добавляем еще
        if (fullText.length < targetLength) {
            return fullText + " В каждом проекте мы соединяем эстетику, технологичность и измеримый результат.";
        }
        
        return fullText;
    }
    
    // Если описание слишком длинное, обрезаем его до нужного размера
    if (baseText.length > targetLength + 50) {
        // Находим последнюю точку или запятую перед целевой длиной
        const cutPoint = baseText.lastIndexOf('.', targetLength);
        if (cutPoint > targetLength - 50) {
            return baseText.substring(0, cutPoint + 1);
        }
        // Если не нашли точку, обрезаем по пробелу
        const spacePoint = baseText.lastIndexOf(' ', targetLength);
        if (spacePoint > targetLength - 50) {
            return baseText.substring(0, spacePoint) + '...';
        }
        return baseText.substring(0, targetLength) + '...';
    }
    
    // Если описание уже подходящего размера, используем его как есть
    return baseText;
};

const RecentProjectsSection = () => {
    const [currentProject, setCurrentProject] = useState<typeof PortfolioV1Data[0] | null>(null);
    const projectText = getProjectText(currentProject);

    return (
        <>
            {/* Зеленая линия сверху */}
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--color-primary, #C9F31D)',
                margin: 0,
                padding: 0
            }}></div>
            
            <div className="project-style-one-area default-padding blurry-shape-left overflow-hidden" style={{ backgroundColor: '#000' }}>
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
                                        key={currentProject?.id || 'default'}
                                    >
                                        {projectText}
                                    </SplitText>
                                </p>
                                <div className="portfolio-info-card">
                                    <h5>Идеальное сочетание креативности и функциональности</h5>
                                </div>
                                <div style={{ marginTop: '30px' }}>
                                    <Link className="btn-animation mt-30" to="/projects">
                                        <i className="fas fa-arrow-right" /> 
                                        <span>Смотреть все работы</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <PortfolioV1 onSlideChange={setCurrentProject} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Зеленая линия снизу */}
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--color-primary, #C9F31D)',
                margin: 0,
                padding: 0
            }}></div>
        </>
    );
};

export default RecentProjectsSection;

