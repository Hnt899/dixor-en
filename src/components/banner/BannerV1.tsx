import illustration5 from '/assets/img/illustration/5.png';
import illustration8 from '/assets/img/illustration/8.png';
// import { Link } from "react-router-dom"; // Мы заменим <Link> на <a>, см. Шаг 2
import SplitText from "../animation/SplitText.jsx"
import Animate from '../animation/Animate';

const BannerV1 = () => {
    return (
        <>
            <div className="banner-style-one-area bg-cover"
                style={{ backgroundImage: `url("/assets/img/shape/3.jpg")` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/8.jpg)' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="banner-style-one-heading">
                                <div className="banner-title">
                                    <h2 className="title-left split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Цифровые
                                        </SplitText>
                                    </h2>

                                    <h2 className="title-right split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Решения
                                        </SplitText>
                                    </h2>
                                </div>
                                <Animate className='animate__animated animate__fadeInRight'>
                                    <div className="thumb">
                                        <img className='regular-img' src={illustration5} alt="Image Not Found" />
                                        <img className='light-img' src={illustration8} alt="Image Not Found" />
                                    </div>
                                </Animate>
                            </div>
                        </div>
                        <div className="col-xl-4 offset-xl-1">
                            <Animate className='animate__animated animate__fadeInUp' delay="1s" duration="0.6s">
                                <div className="banner-style-one-info">
                                    <div className="top-info">
                                        <h4>Работаем по всему миру</h4>
                                        <p>
                                            Ваш надёжный партнёр в мире digital
                                        </p>
                                    </div>
                                    <div className="bottom">
                                        <p>
                                            Мы превращаем идеи в успешные цифровые проекты. От стратегии и комплексного дизайна до разработки, запуска и продвижения.
                                        </p>

                                        {/* ВАЖНО: Я заменил <Link to="/project"> на <a href="#projects">.
                                          См. Шаг 2 ниже.
                                        */}
                                        <a href="#projects" className="btn-style-two mt-30"><i className="fas fa-long-arrow-right" /> Наши <br /> Проекты</a>

                                    </div>
                                </div>
                            </Animate>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV1;