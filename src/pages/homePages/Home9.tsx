import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import BlogV2 from "../../components/blog/BlogV2";
import BrandV1 from "../../components/brand/BrandV1";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV1 from "../../components/header/HeaderV1";
import MultiSection from "../../components/multi/MultiSection";
import PriceV2 from "../../components/price/PriceV2";
import ServicesV1 from "../../components/services/ServicesV1";
import TeamV3Carousel from "../../components/team/TeamV3Carousel";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import RecentProjectsSection from "../../components/portfolio/RecentProjectsSection";

const Home9 = () => {
    // Обработка hash при загрузке страницы (для перехода с других страниц)
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#projects') {
            // Небольшая задержка, чтобы контент успел загрузиться
            setTimeout(() => {
                const element = document.getElementById('projects');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Dixor - Home 9</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV1 />
                <BannerV1 />
                <BrandV1 />

                {/* ID для "О нас" */}
                <div id="about">
                    <AboutV1 />
                </div>

                {/* ID для "Услуги" */}
                <div id="services">
                    <ServicesV1 sectionClass='default-padding bg-gray' hasTitle={true} />
                </div>

                {/* ID для "Проекты" */}
                <div id="projects">
                    <RecentProjectsSection />
                </div>

                {/* ID для "Предложения" (Лучшие предложения) */}
                <div id="pricing">
                    <PriceV2 />
                </div>
                <TestimonialV1 />

                {/* ID для "Команда" */}
                <div id="team">
                    <TeamV3Carousel sectionClass='bg-gray' hasTitle={true} />
                </div>

                {/* ID для "Контакты" (уже был) */}
                <div id="contact">
                    <MultiSection />
                </div>

                {/* ID для "Блог" */}
                <div id="blog">
                    <BlogV2 sectionClass='bg-gray' />
                </div>

                <FooterV3 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home9;