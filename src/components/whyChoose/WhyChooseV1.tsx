import Animate from '../animation/Animate';

interface DataType {
    sectionClass?: string
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-one">
                                <img src="/assets/img/девушка топает.png" alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="choose-us-style-one">
                                <div className="pl-80 pl-md-0 pl-xs-0">
                                    <h4 className="sub-title">Почему CDI</h4>
                                    <h2 className="title">Откройте путь к росту дохода</h2>
                                    <div className="faq-style-one accordion mt-30" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Бизнес-инновации
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Мы внедряем передовые технологии и стратегии, чтобы
                                                        обеспечить вашему бизнесу конкурентное преимущество
                                                        и вывести его на новый уровень.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Поисковая оптимизация (SEO)
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Наши SEO-специалисты используют проверенные методики
                                                        для привлечения целевого трафика, который
                                                        конвертируется в реальных клиентов.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Нестандартное мышление
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Мы не боимся сложных задач и предлагаем креативные
                                                        решения, которые выходят за рамки шаблонов
                                                        и приносят измеримый результат.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="award-items">
                                    <Animate className='animate__animated animate__fadeInLeft'>
                                        <div className="award-item">
                                            <i className="fab fa-behance" />
                                            <h4>Награды Behance</h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="100ms">
                                        <div className="award-item">
                                            <i className="fas fa-layer-group" />
                                            <h4>Награды за Дизайн</h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="200ms">
                                        <div className="award-item">
                                            <i className="fab fa-laravel" />
                                            <h4>Награды за Разработку</h4>
                                        </div>
                                    </Animate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV1;