import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json";
import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    title?: string;
}

interface ServiceDetailsProps {
    serviceInfo?: DataType;
    sectionClass?: string;
}

const ServiceDetailsContent = ({ serviceInfo, sectionClass }: ServiceDetailsProps) => {
    const { title, id } = serviceInfo || {};
    
    // Получаем изображение в зависимости от ID услуги
    const getServiceImage = () => {
        if (!id) return "/assets/услуги/1.jpg";
        const imageId = id <= 3 ? id : ((id - 1) % 3) + 1;
        return `/assets/услуги/${imageId}.jpg`;
    };

    return (
        <>
            <div className={`services-details-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="services-details-items">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="service-single-thumb">
                                    <img src={getServiceImage()} alt={title || "Service"} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <h2>{title}</h2>
                                <p>
                                    Мы с праведным гневом осуждаем и ненавидим людей, которые настолько очарованы и неосознанны прелестями сиюминутного удовольствия, настолько ослеплены желанием, что не могут предвидеть боль и беды, которые неизбежно последуют. Эти случаи совершенно просты и легко различимы. В свободный час, когда наша свобода выбора не ограничена, структуры данных управляют данными в технологиях. Ненавидим людей, которые настолько очарованы и неосознанны прелестями сиюминутного удовольствия, настолько ослеплены желанием, что не могут предвидеть боль и беды.
                                </p>
                            </div>
                            <div className="col-lg-5 pl-60 pl-md-15 pl-xs-15">
                                <p>
                                    Правило, несколько вежливо любезных довольных, несённых. Эти случаи совершенно просты и легко различимы.
                                </p>
                                <ul className="feature-list-item">
                                    <li>Маркетинг в социальных сетях</li>
                                    <li>Поисковая оптимизация (SEO)</li>
                                    <li>Связи с общественностью</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-50 mt-xs-20">
                            <div className="process-style-two">
                                <div className="process-style-two-item">
                                    <span>01</span>
                                    <h4>Проектное исследование</h4>
                                    <p>
                                        Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>02</span>
                                    <h4>Лучшая концепция</h4>
                                    <p>
                                        Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>03</span>
                                    <h4>Проектирование и реализация</h4>
                                    <p>
                                        Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>04</span>
                                    <h4>Окончательный результат</h4>
                                    <p>
                                        Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-80 mt-xs-50 gallery-two-columns">
                            <div className="col-md-6">
                                <img src="/assets/услуги/2.jpg" alt="Услуга 2" />
                            </div>
                            <div className="col-md-6">
                                <img src="/assets/услуги/3.jpg" alt="Услуга 3" />
                            </div>
                        </div>
                        <div className="d-grid colums-2 mt-50">
                            <div className="item">
                                <div className="faq-style-one faq-style-two">
                                    <h2 className="mb-30">Если у вас есть вопросы, найдите их здесь.</h2>
                                    <div className="accordion" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Бизнес-инновации
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Аппетит Беннингса расположил меня к предметам. Никакого снисхождения, поэтому обнаружилось, что квартиры мистера отключены под страхом смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Поисковая оптимизация
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Регулярность аппетита располагала меня к предметам. Никакого снисхождения, поэтому обнаружил, что квартиры мистера отключены под безумием смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Думать по-другому
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Постоянный аппетит располагал меня к предметам. Никакого снисхождения, поэтому обнаружил, что квартиры мистера отключены под безумием смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <h2>Что мы делаем?</h2>
                                <p>
                                    Обычное свободное время, когда наша свобода выбора не ограничена, мы создаем решения, которые помогают бизнесу достигать максимальных результатов. Мы предлагаем комплексный подход к решению задач, учитывая все аспекты и возможности.
                                </p>
                                <p>
                                    Мы обеспечиваем полный спектр услуг, начиная от анализа и планирования до реализации и поддержки. Наша команда профессионалов работает над каждым проектом с максимальной отдачей, используя современные технологии и проверенные методики для достижения наилучших результатов.
                                </p>
                            </div>
                        </div>
                        <div className="services-more mt-100 mt-xs-30">
                            <h2 className="mb-20">Самые популярные услуги</h2>
                            <div className="row">
                                {ServicesV1Data.slice(0, 3).map(service =>
                                    <div className="col-lg-4 col-md-6" key={service.id}>
                                        <div className="item">
                                            <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="Image Not Found" width={75} height={60} />
                                            <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} />
                                            <h4><Link to={`/service-details/${service.id}`}>{service.title}</Link></h4>
                                            <p>{service.text}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetailsContent;