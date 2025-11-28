import arrowIcon from '/assets/img/icon/arrow.png';
import arrowThemeIcon from '/assets/img/icon/arrow-theme.png';
import banner3 from '/assets/img/banner/3.jpg';
// import { Link } from "react-router-dom"; // Ссылка больше не используется, заменена на <a>
import SkillProgress from '../process/SkillProgress';
import SkillProgressData from "../../../src/assets/jsonData/progress/SkillProgressData.json";
import TextScrollAnimation from '../animation/TextScrollAnimation';
import CountUp from 'react-countup';
import { useEffect } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useThumbParallax from '../../hooks/useThumbParallax';


interface DataType {
    lightMode?: boolean;
}

const AboutV1 = ({ lightMode }: DataType) => {

    const containerRef = useScrollAnimation();

    useThumbParallax();

    // Убеждаемся, что фотография всегда по центру при монтировании компонента
    useEffect(() => {
        const centerAboutImage = () => {
            const aboutImages = document.querySelectorAll(
                '.about-style-one-area .bottom-info .thumb .img-container img'
            ) as NodeListOf<HTMLElement>;
            
            aboutImages.forEach((img) => {
                // Принудительно устанавливаем центрирование
                img.style.left = '50%';
                img.style.transform = 'translateX(-50%) scale(1.4)';
                // Принудительно применяем CSS правило через reflow
                void img.offsetHeight;
            });
        };

        // Выполняем центрирование сразу и после небольших задержек
        centerAboutImage();
        const timeout1 = setTimeout(centerAboutImage, 50);
        const timeout2 = setTimeout(centerAboutImage, 200);
        const timeout3 = setTimeout(centerAboutImage, 500);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <>
            <div className="about-style-one-area bg-cover default-padding"
                style={{ backgroundImage: lightMode ? 'none' : 'url(/assets/img/shape/13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="about-style-one-left-info">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={2000} enableScrollSpy /></div>
                                        <div className="operator"></div>
                                    </div>
                                    <span className="medium">Завершено проектов</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        {/* Я изменил 16M на 150+ */}
                                        <div className="timer"><CountUp end={150} enableScrollSpy /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Довольных клиентов</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1">
                            <div className="about-style-one-info text-scroll-animation" ref={containerRef}>
                                <p className="text">
                                    Мы — команда стратегов, дизайнеров и разработчиков, объединённых общей целью: создавать цифровые продукты, которые решают задачи бизнеса и восхищают пользователей. Мы верим в осмысленный дизайн и технологии, которые работают на результат.
                                </p>
                                <div className="d-flex">

                                    {/* ВАЖНО: Я заменил ссылку <Link to="/about-us"> на <a href="#contact">.
                                      Она будет вести на блок "Связаться с нами". См. Шаг 2.
                                    */}
                                    {lightMode ?
                                        <a href="#contact"><img src={arrowThemeIcon} alt="Image Not Found" /></a> :
                                        <a href="#contact"><img src={arrowIcon} alt="Image Not Found" /></a>
                                    }

                                    <TextScrollAnimation triggerClassName="text">
                                        <h2 className="title text">Креативное и современное digital-агентство</h2>
                                    </TextScrollAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bottom-info mt-80 mt-md-50 mt-xs-30">
                                <div className="thumb">
                                    <div className="img-container">
                                        <img src={banner3} alt="Image Not Found" />
                                    </div>
                                    <div className="about-skills">
                                        {/* Progress Bar - данные берутся из JSON. См. Шаг 3 */}
                                        {SkillProgressData.map(skill =>
                                            <SkillProgress skill={skill} key={skill.id} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;