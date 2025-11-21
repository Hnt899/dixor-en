import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, EffectFade } from 'swiper/modules';
import PortfolioV1Data from '../../../src/assets/jsonData/portfolio/PortfolioV1Data.json';
import SinglePortfolioV1 from './SinglePortfolioV1';
import { Link } from 'react-router-dom';

const PortfolioV1 = () => {
    // Функция для проверки, что название состоит из 2 слов
    const hasTwoWords = (project: typeof PortfolioV1Data[0]) => {
        const text = (project.text || '').trim();
        const textBold = (project.textBold || '').trim();
        const fullTitle = `${text} ${textBold}`.trim();
        const words = fullTitle.split(/\s+/).filter(word => word.length > 0);
        return words.length === 2;
    };

    // Функция для выбора проектов из разных категорий с названиями из 2 слов
    const getRecentProjects = () => {
        const categories = ['Сайты', 'Мобильные приложения', 'UI/UX'];
        const selectedProjects: typeof PortfolioV1Data = [];
        const maxProjects = 7;
        
        // Берем проекты из каждой категории с названиями из 2 слов
        categories.forEach(category => {
            const categoryProjects = PortfolioV1Data.filter(
                project => project.category === category && hasTwoWords(project)
            );
            if (categoryProjects.length > 0) {
                // Берем последние 2 проекта из категории
                const recentFromCategory = categoryProjects.slice(-2);
                selectedProjects.push(...recentFromCategory);
            }
        });
        
        // Если проектов больше нужного количества, ограничиваем
        if (selectedProjects.length > maxProjects) {
            // Берем последние maxProjects проектов
            return selectedProjects.slice(-maxProjects);
        }
        
        // Если проектов меньше нужного количества, добавляем проекты из всех категорий с 2 словами
        if (selectedProjects.length < maxProjects) {
            const remaining = maxProjects - selectedProjects.length;
            const allProjects = PortfolioV1Data.filter(
                project => !selectedProjects.some(selected => selected.id === project.id) && hasTwoWords(project)
            );
            selectedProjects.push(...allProjects.slice(-remaining));
        }
        
        return selectedProjects;
    };

    const recentProjects = getRecentProjects();

    return (
        <>
            <div className="portfolio-style-one-content">
                <Swiper className="portfolio-style-two-carousel"
                    direction="horizontal"
                    loop={true}
                    autoplay={false}
                    effect={"fade"}
                    fadeEffect={{ crossFade: true }}
                    speed={1000}
                    pagination={{
                        el: ".project-pagination",
                        type: "custom",
                        clickable: true,
                        renderCustom: (_swiper, current, total) => `${current} <span></span> ${Math.min(7, total)}`,
                    }}
                    navigation={{
                        nextEl: ".project-button-next",
                        prevEl: ".project-button-prev",
                    }}
                    modules={[Navigation, Pagination, EffectFade, Keyboard]}
                >
                    <div className="swiper-wrapper">
                        {recentProjects.map((portfolio, index) =>
                            <SwiperSlide key={portfolio.id}>
                                <SinglePortfolioV1 portfolio={portfolio} usePlaceholderLogo={true} placeholderIndex={index + 1} />
                            </SwiperSlide>
                        )}
                    </div>
                </Swiper>
                <div className="project-swiper-nav">
                    <div className="project-pagination" />
                    <div className="project-button-prev" />
                    <div className="project-button-next" />
                </div>
                <div className="portfolio-mobile-view-all-btn" style={{ display: 'none' }}>
                    <Link className="btn-contact-style" to="/projects">
                        Смотреть все работы
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PortfolioV1;