import { useState } from "react";
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
    const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

    const handleMouseEnter = (serviceId: number) => {
        setActiveServiceId(serviceId);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };
    
    // Получаем изображение в зависимости от ID услуги
    const getServiceImage = () => {
        const heroImages: Record<number, string> = {
            1: "/assets/услуги/Цифровой Маркетинг и SEO.jpg",
            2: "/assets/услуги/Веб и мобильная разработка.jpg",
            3: "/assets/услуги/uiux.jpg",
            4: "/assets/услуги/современные технологии.jpg",
        };

        return heroImages[id || 1] || heroImages[1];
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
                                {id === 1 ? (
                                    <p>
                                        Мы помогаем бизнесам расти и добиваться измеримых результатов в цифровом пространстве. В современном мире, где решения принимаются в считанные секунды, а конкуренция постоянно растет, наличие сильной онлайн-стратегии — это не роскошь, а необходимость. Мы разрабатываем комплексные, прозрачные и эффективные решения, которые обеспечивают стабильный трафик, повышают конверсию и укрепляют ваш бренд.
                                    </p>
                                ) : id === 2 ? (
                                    <p>
                                        Мы превращаем ваши бизнес-идеи в высокотехнологичные, функциональные и масштабируемые цифровые продукты. В основе нашей работы лежит принцип Digital First — создание решений, которые идеально работают на любых устройствах и обеспечивают максимальное удобство для конечного пользователя. Мы строим прочный технический фундамент для вашего роста.
                                    </p>
                                ) : id === 3 ? (
                                    <p>
                                        Мы создаем цифровые продукты, которые не только выглядят безупречно, но и решают задачи пользователей максимально эффективно. Качественный UI/UX Дизайн — это стратегический инструмент, который снижает процент отказов, повышает конверсию и формирует прочную эмоциональную связь между вашим брендом и клиентом. Мы проектируем логичные, эстетичные и удобные интерфейсы.
                                    </p>
                                ) : id === 4 ? (
                                    <p>
                                        Мы используем передовые и проверенные технологии, чтобы создавать высокопроизводительные, безопасные и масштабируемые решения. Наш технологический стек не статичен — мы постоянно отслеживаем мировые тренды и интегрируем лучшие инструменты, чтобы гарантировать, что ваш продукт будет актуальным и конкурентоспособным в долгосрочной перспективе. Мы выбираем технологии, которые обеспечивают максимальную эффективность и надежность.
                                    </p>
                                ) : (
                                <p>
                                    Мы с праведным гневом осуждаем и ненавидим людей, которые настолько очарованы и неосознанны прелестями сиюминутного удовольствия, настолько ослеплены желанием, что не могут предвидеть боль и беды, которые неизбежно последуют. Эти случаи совершенно просты и легко различимы. В свободный час, когда наша свобода выбора не ограничена, структуры данных управляют данными в технологиях. Ненавидим людей, которые настолько очарованы и неосознанны прелестями сиюминутного удовольствия, настолько ослеплены желанием, что не могут предвидеть боль и беды.
                                </p>
                                )}
                            </div>
                            <div className="col-lg-5 pl-60 pl-md-15 pl-xs-15">
                                {id === 1 ? (
                                    <>
                                        <h3 className="mb-20">Наши ключевые направления</h3>
                                        <div className="faq-style-one faq-style-two">
                                            <div className="accordion" id={`directionsAccordion-${id}`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseOne-${id}`} aria-expanded="true" aria-controls={`directionsCollapseOne-${id}`}>
                                                            Маркетинг в социальных сетях (SMM)
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`directionsHeadingOne-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Создание вовлекающего контента, управление сообществами и запуск целевых рекламных кампаний для прямого взаимодействия с вашей аудиторией.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseTwo-${id}`} aria-expanded="false" aria-controls={`directionsCollapseTwo-${id}`}>
                                                            Поисковая оптимизация (SEO)
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingTwo-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Комплексная работа над техническим состоянием сайта, контентом и внешними факторами для достижения высоких позиций в поисковых системах и привлечения органического трафика.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseThree-${id}`} aria-expanded="false" aria-controls={`directionsCollapseThree-${id}`}>
                                                            Связи с общественностью (PR) в цифровой среде
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingThree-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Управление репутацией, работа с лидерами мнений и публикации на авторитетных ресурсах для повышения доверия и узнаваемости бренда.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : id === 2 ? (
                                    <>
                                        <h3 className="mb-20">Наши ключевые направления</h3>
                                        <div className="faq-style-one faq-style-two">
                                            <div className="accordion" id={`directionsAccordion-${id}`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseOne-${id}`} aria-expanded="true" aria-controls={`directionsCollapseOne-${id}`}>
                                                            Frontend и UX/UI Дизайн
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`directionsHeadingOne-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Разработка интуитивно понятных пользовательских интерфейсов и адаптивной верстки, обеспечивающей идеальное отображение на всех экранах (десктоп, планшет, мобайл).
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseTwo-${id}`} aria-expanded="false" aria-controls={`directionsCollapseTwo-${id}`}>
                                                            Backend и Системная Архитектура
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingTwo-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Создание надежной серверной части, баз данных и API, способных выдерживать высокие нагрузки и обеспечивать безопасность данных.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseThree-${id}`} aria-expanded="false" aria-controls={`directionsCollapseThree-${id}`}>
                                                            Нативная и кроссплатформенная разработка
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingThree-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Разработка высокопроизводительных мобильных приложений для iOS, Android или использование кроссплатформенных фреймворков для оптимизации бюджета и сроков.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : id === 3 ? (
                                    <>
                                        <h3 className="mb-20">Наши ключевые задачи</h3>
                                        <div className="faq-style-one faq-style-two">
                                            <div className="accordion" id={`directionsAccordion-${id}`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseOne-${id}`} aria-expanded="true" aria-controls={`directionsCollapseOne-${id}`}>
                                                            UI (User Interface) Дизайн
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`directionsHeadingOne-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Создание визуально привлекательных, современных и соответствующих бренду интерфейсов, включая разработку дизайн-систем и гайдлайнов.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseTwo-${id}`} aria-expanded="false" aria-controls={`directionsCollapseTwo-${id}`}>
                                                            UX (User Experience) Проектирование
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingTwo-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Разработка логики взаимодействия, карты пользовательских сценариев и прототипов для обеспечения максимального удобства и интуитивности.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseThree-${id}`} aria-expanded="false" aria-controls={`directionsCollapseThree-${id}`}>
                                                            Аудит и юзабилити-тестирование
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingThree-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Оценка существующих интерфейсов, выявление "болевых точек" и проверка эффективности дизайна на реальных пользователях.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : id === 4 ? (
                                    <>
                                        <h3 className="mb-20">Наши технологические направления</h3>
                                        <div className="faq-style-one faq-style-two">
                                            <div className="accordion" id={`directionsAccordion-${id}`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseOne-${id}`} aria-expanded="true" aria-controls={`directionsCollapseOne-${id}`}>
                                                            Frontend-технологии
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`directionsHeadingOne-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Использование современных фреймворков, таких как React, Vue.js и Angular, для создания динамичных и быстрых пользовательских интерфейсов.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseTwo-${id}`} aria-expanded="false" aria-controls={`directionsCollapseTwo-${id}`}>
                                                            Backend и Облачные сервисы
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingTwo-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Применение языков Python, Node.js, Go и развертывание на надежных облачных платформах (AWS, Google Cloud, Azure) для обеспечения масштабируемости и отказоустойчивости.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`directionsHeadingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#directionsCollapseThree-${id}`} aria-expanded="false" aria-controls={`directionsCollapseThree-${id}`}>
                                                            Базы данных и Big Data
                                                        </button>
                                                    </h2>
                                                    <div id={`directionsCollapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`directionsHeadingThree-${id}`} data-bs-parent={`#directionsAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p>
                                                                Работа с реляционными (PostgreSQL, MySQL) и NoSQL базами данных (MongoDB, Redis), а также внедрение решений для обработки больших объемов данных.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                <p>
                                    Правило, несколько вежливо любезных довольных, несённых. Эти случаи совершенно просты и легко различимы.
                                </p>
                                <ul className="feature-list-item">
                                    <li>Маркетинг в социальных сетях</li>
                                    <li>Поисковая оптимизация (SEO)</li>
                                    <li>Связи с общественностью</li>
                                </ul>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-50 mt-xs-20">
                            {(id === 1 || id === 2 || id === 3 || id === 4) && (
                                <h2 className="mb-30">
                                    {id === 1 ? "Наш 4-шаговый подход к результату" : id === 2 ? "Этапы разработки вашего продукта" : id === 3 ? "Наш 4-шаговый процесс дизайна" : "Процесс интеграции технологий"}
                                </h2>
                            )}
                            <div className="process-style-two">
                                <div className="process-style-two-item">
                                    <span>01</span>
                                    <h4>Проектное исследование</h4>
                                    <p>
                                        {id === 1 
                                            ? "Глубокий анализ вашего бизнеса, конкурентов и целевой аудитории. Мы определяем текущие \"болевые точки\", выявляем возможности роста и ставим четкие, измеримые цели (KPI)."
                                            : id === 2
                                            ? "Сбор требований, анализ функционала и целевой аудитории. Результатом является техническое задание (ТЗ), определение стека технологий и создание прототипа (Wireframe)."
                                            : id === 3
                                            ? "Глубокий анализ бизнес-целей, целевой аудитории (создание персон), конкурентов и проведение юзабилити-аудита текущего продукта (если есть)."
                                            : id === 4
                                            ? "Анализ требований проекта, определение ожидаемых нагрузок, функционала и бюджета. Выбор оптимального технологического стека, который наилучшим образом соответствует целям бизнеса."
                                            : "Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии."
                                        }
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>02</span>
                                    <h4>Лучшая концепция</h4>
                                    <p>
                                        {id === 1
                                            ? "На основе исследования разрабатываем индивидуальную стратегию. Включает выбор ключевых каналов продвижения, формирование контент-плана, проработку семантического ядра и определение технического задания."
                                            : id === 2
                                            ? "Разработка дизайн-концепции, включая UX/UI дизайн. Создание архитектуры проекта (база данных, модули) и планирование спринтов для эффективной разработки."
                                            : id === 3
                                            ? "Разработка архитектуры информации (Information Architecture), создание пользовательских сценариев (User Flow) и низкодетализированных вайрфреймов (Wireframes)."
                                            : id === 4
                                            ? "Проектирование системной архитектуры (микросервисы или монолит), разработка детальных схем взаимодействия компонентов и планирование инфраструктуры (DevOps)."
                                            : "Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии."
                                        }
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>03</span>
                                    <h4>Проектирование и реализация</h4>
                                    <p>
                                        {id === 1
                                            ? "Внедрение утвержденной стратегии: техническая оптимизация сайта, создание и размещение контента, запуск рекламных кампаний и управление SMM-активностями. Все работы проводятся с акцентом на качество и соответствие лучшим практикам."
                                            : id === 2
                                            ? "Непосредственная разработка функционала (кодинг), интеграция с внешними сервисами, постоянное тестирование (Unit, интеграционное) и развертывание тестовых версий (Staging)."
                                            : id === 3
                                            ? "Создание высокодетализированных прототипов, проработка UI-дизайна, подбор цветовых схем, шрифтов и финальная передача дизайн-макетов в разработку (с использованием Figma/Sketch)."
                                            : id === 4
                                            ? "Внедрение выбранных технологий, настройка CI/CD (непрерывная интеграция/доставка), написание чистого и документированного кода, а также проведение нагрузочного тестирования."
                                            : "Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии."
                                        }
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>04</span>
                                    <h4>Окончательный результат</h4>
                                    <p>
                                        {id === 1
                                            ? "Ежемесячный мониторинг, анализ данных, отчетность и внесение корректировок в стратегию. Мы фокусируемся на постоянном улучшении показателей, чтобы обеспечить устойчивый и долгосрочный рост вашего бизнеса."
                                            : id === 2
                                            ? "Запуск готового продукта (Deployment) на продакшн-серверах. Последующая техническая поддержка, исправление ошибок и плановое развитие/добавление нового функционала."
                                            : id === 3
                                            ? "Подготовка Design System для разработчиков, помощь в интеграции дизайна и последующий мониторинг метрик для подтверждения эффективности разработанного решения."
                                            : id === 4
                                            ? "Развертывание готового решения, мониторинг производительности системы в реальных условиях и последующая техническая поддержка с регулярными обновлениями технологической базы."
                                            : "Извините, сделка говорит о том, что они сами сдерживают производительность от сравнения новой меланхолии."
                                        }
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
                                {/* Изображение для мобильной версии - над блоком с вопросами */}
                                <div className="service-mobile-image service-mobile-image-faq">
                                    <img src="/assets/услуги/2.jpg" alt="Услуга 2" />
                                </div>
                                <div className="faq-style-one faq-style-two">
                                    <h2 className="mb-30">Если у вас есть вопросы, найдите их здесь.</h2>
                                    <div className="accordion" id={`faqAccordion-${id}`}>
                                        {id === 1 ? (
                                            <>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${id}`} aria-expanded="true" aria-controls={`collapseOne-${id}`}>
                                                            Бизнес-инновации
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Как цифровой маркетинг поможет моему бизнесу развиваться?</p>
                                                            <p><strong>Ответ:</strong> Цифровой маркетинг позволяет точно определить целевую аудиторию, настроить персонализированное взаимодействие и измерять эффективность каждой кампании. Это приводит к росту узнаваемости, привлечению квалифицированных лидов и, как следствие, увеличению продаж и доли рынка.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo-${id}`} aria-expanded="false" aria-controls={`collapseTwo-${id}`}>
                                                            Поисковая оптимизация
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Почему SEO — это долгосрочная инвестиция, а не быстрый результат?</p>
                                                            <p><strong>Ответ:</strong> SEO (Поисковая оптимизация) — это процесс, который требует времени для накопления авторитета и индексации контента поисковыми системами. Устойчивые результаты начинаются через 3-6 месяцев, но они обеспечивают бизнесу бесплатный и постоянный органический трафик, который гораздо более выгоден в долгосрочной перспективе, чем платная реклама.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree-${id}`} aria-expanded="false" aria-controls={`collapseThree-${id}`}>
                                                            Думать по-другому
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingThree-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Чем ваше агентство отличается от конкурентов?</p>
                                                            <p><strong>Ответ:</strong> Мы не просто исполнители — мы стратегические партнеры. Наш подход основан на глубоком погружении в специфику вашего бизнеса и мышлении "за рамками шаблона". Мы комбинируем креативные идеи с аналитикой данных, чтобы создавать уникальные стратегии, которые действительно выделяют наших клиентов среди конкурентов.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : id === 2 ? (
                                            <>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${id}`} aria-expanded="true" aria-controls={`collapseOne-${id}`}>
                                                            Нативное или Кроссплатформенное?
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Какое решение лучше: нативное приложение (iOS/Android) или кроссплатформенное?</p>
                                                            <p><strong>Ответ:</strong> Выбор зависит от ваших целей. Нативное дает максимальную производительность и полный доступ к функциям устройства, но требует двойной разработки. Кроссплатформенное (например, React Native или Flutter) экономит время и бюджет, используя единую кодовую базу для обеих ОС, что идеально для MVP и приложений со стандартным функционалом.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo-${id}`} aria-expanded="false" aria-controls={`collapseTwo-${id}`}>
                                                            Сопровождение и Поддержка
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Что происходит с проектом после его запуска (релиз)?</p>
                                                            <p><strong>Ответ:</strong> Запуск — это только начало. Мы предлагаем постоянную техническую поддержку и сопровождение: исправление ошибок, обновление библиотек, адаптация к новым версиям ОС и добавление нового функционала (итеративное развитие). Мы гарантируем, что ваш продукт останется стабильным и актуальным.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree-${id}`} aria-expanded="false" aria-controls={`collapseThree-${id}`}>
                                                            Архитектура и Масштабирование
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingThree-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Насколько масштабируемым будет разработанное вами приложение?</p>
                                                            <p><strong>Ответ:</strong> Мы изначально проектируем системы с учетом будущего роста и высоких нагрузок. Используя микросервисную архитектуру и облачные сервисы (AWS, Google Cloud), мы обеспечиваем возможность горизонтального масштабирования, позволяя вашему продукту легко выдерживать резкий рост числа пользователей.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : id === 3 ? (
                                            <>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${id}`} aria-expanded="true" aria-controls={`collapseOne-${id}`}>
                                                            Бизнес-инновации
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> В чем разница между UI и UX?</p>
                                                            <p><strong>Ответ:</strong> UX (User Experience) — это пользовательский опыт, то есть то, как работает продукт (логика, удобство, интуитивность). UI (User Interface) — это пользовательский интерфейс, то есть то, как продукт выглядит (визуальный стиль, кнопки, цвета). Мы работаем над обеими составляющими, чтобы продукт был и красивым, и удобным.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo-${id}`} aria-expanded="false" aria-controls={`collapseTwo-${id}`}>
                                                            Поисковая оптимизация
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Как дизайн влияет на SEO?</p>
                                                            <p><strong>Ответ:</strong> Дизайн напрямую влияет на поведенческие факторы, которые критически важны для SEO. Хороший UX снижает процент отказов, увеличивает время пребывания на сайте и глубину просмотра страниц. Эти метрики сигнализируют поисковым системам, что ваш контент полезен, что, в свою очередь, улучшает ваши позиции.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree-${id}`} aria-expanded="false" aria-controls={`collapseThree-${id}`}>
                                                            Думать по-другому
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingThree-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Какие инструменты вы используете для проектирования?</p>
                                                            <p><strong>Ответ:</strong> В зависимости от задачи, мы используем профессиональные инструменты, такие как Figma (для макетирования и прототипирования), Miro (для совместной работы и карт пути пользователя) и специализированные инструменты для юзабилити-тестирования (например, Hotjar или UsabilityHub).</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : id === 4 ? (
                                            <>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${id}`} aria-expanded="true" aria-controls={`collapseOne-${id}`}>
                                                            Стратегия Выбора Стека
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Как вы выбираете, какую технологию использовать для моего проекта?</p>
                                                            <p><strong>Ответ:</strong> Выбор основывается на четких бизнес-требованиях, таких как ожидаемая нагрузка, скорость разработки, необходимость интеграции с существующими системами и бюджет. Мы всегда ищем баланс между инновационностью и проверенной надежностью.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo-${id}`} aria-expanded="false" aria-controls={`collapseTwo-${id}`}>
                                                            Надежность и Инновации
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Вы используете только самые новые, "модные" технологии?</p>
                                                            <p><strong>Ответ:</strong> Мы используем современные и стабильные технологии. Хотя мы следим за инновациями, мы не гонимся за каждой "модной" новинкой. Приоритет отдается тем инструментам и фреймворкам, которые имеют широкую поддержку сообщества, доказанную безопасность и потенциал для долгосрочного развития.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree-${id}`} aria-expanded="false" aria-controls={`collapseThree-${id}`}>
                                                            Безопасность и Инфраструктура
                                                        </button>
                                                    </h2>
                                                    <div id={`collapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingThree-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                        <div className="accordion-body">
                                                            <p><strong>Вопрос:</strong> Как вы обеспечиваете безопасность данных при использовании облачных технологий?</p>
                                                            <p><strong>Ответ:</strong> Мы внедряем комплексные протоколы безопасности, включая шифрование данных, аудит доступа, регулярное обновление систем и настройку брандмауэров. При работе с облачными провайдерами (AWS, Azure) мы строго следуем их лучшим практикам по защите инфраструктуры.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                        <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingOne-${id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${id}`} aria-expanded="true" aria-controls={`collapseOne-${id}`}>
                                                    Бизнес-инновации
                                                </button>
                                            </h2>
                                                    <div id={`collapseOne-${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                <div className="accordion-body">
                                                    <p>
                                                        Аппетит Беннингса расположил меня к предметам. Никакого снисхождения, поэтому обнаружилось, что квартиры мистера отключены под страхом смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingTwo-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo-${id}`} aria-expanded="false" aria-controls={`collapseTwo-${id}`}>
                                                    Поисковая оптимизация
                                                </button>
                                            </h2>
                                                    <div id={`collapseTwo-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                <div className="accordion-body">
                                                    <p>
                                                        Регулярность аппетита располагала меня к предметам. Никакого снисхождения, поэтому обнаружил, что квартиры мистера отключены под безумием смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`headingThree-${id}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree-${id}`} aria-expanded="false" aria-controls={`collapseThree-${id}`}>
                                                    Думать по-другому
                                                </button>
                                            </h2>
                                                    <div id={`collapseThree-${id}`} className="accordion-collapse collapse" aria-labelledby={`headingThree-${id}`} data-bs-parent={`#faqAccordion-${id}`}>
                                                <div className="accordion-body">
                                                    <p>
                                                        Постоянный аппетит располагал меня к предметам. Никакого снисхождения, поэтому обнаружил, что квартиры мистера отключены под безумием смерти.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                {/* Изображение для мобильной версии - над блоком "Что мы делаем" */}
                                <div className="service-mobile-image service-mobile-image-what">
                                    <img src="/assets/услуги/3.jpg" alt="Услуга 3" />
                                </div>
                                <h2>Что мы делаем?</h2>
                                {id === 1 ? (
                                    <>
                                        <p>
                                            Мы создаем эффективные и измеримые решения, которые помогают бизнесу достигать максимальных результатов в онлайн-среде. Мы предлагаем комплексный подход к решению задач, учитывая все аспекты цифрового присутствия — от технического аудита до стратегического планирования.
                                        </p>
                                        <p>
                                            Мы обеспечиваем полный спектр услуг, начиная с детального анализа и планирования, и заканчивая реализацией стратегий и постоянной поддержкой. Наша команда профессионалов работает над каждым проектом с максимальной отдачей, используя современные технологии и проверенные методики для достижения наилучших и долгосрочных результатов.
                                        </p>
                                    </>
                                ) : id === 2 ? (
                                    <>
                                        <p>
                                            Мы создаем высококачественные и функциональные веб-сайты, сложные корпоративные порталы и нативные мобильные приложения. Мы предлагаем комплексный подход к разработке, который включает аналитику, проектирование архитектуры, чистый код и тщательное тестирование, чтобы ваш продукт работал безупречно с первого дня.
                                        </p>
                                        <p>
                                            Мы обеспечиваем полный спектр услуг, начиная с формирования идеи и планирования, до финального запуска и долгосрочной технической поддержки. Наша команда профессионалов работает над каждым проектом с максимальной отдачей, используя современные технологии и проверенные методологии (например, Agile) для достижения наилучших и масштабируемых результатов.
                                        </p>
                                    </>
                                ) : id === 3 ? (
                                    <>
                                        <p>
                                            Мы создаем цифровые продукты, которые являются не просто красивыми, а стратегически эффективными. Мы предлагаем комплексный подход к UI/UX, начиная с глубокого анализа потребностей бизнеса и поведенческих паттернов пользователей, и заканчивая созданием идеальных, готовых к разработке дизайн-макетов.
                                        </p>
                                        <p>
                                            Мы обеспечиваем полный спектр услуг, включающий исследования, прототипирование и финальный дизайн. Наша команда профессионалов работает над каждым проектом с максимальной отдачей, используя принципы HCD (Human-Centered Design) и современные инструменты для достижения максимальной конверсии и удовлетворенности пользователей.
                                        </p>
                                    </>
                                ) : id === 4 ? (
                                    <>
                                        <p>
                                            Мы не просто используем технологии — мы стратегически выбираем и внедряем их, чтобы создать оптимальную архитектуру для вашего продукта. Мы предлагаем комплексный подход, который учитывает не только текущие задачи, но и планы по масштабированию, обеспечивая будущую готовность к росту.
                                        </p>
                                        <p>
                                            Мы обеспечиваем полный цикл работы с технологиями: от выбора стека и проектирования облачной инфраструктуры до настройки CI/CD, безопасности и последующего технического обслуживания. Наша команда гарантирует, что ваш продукт будет работать на современном, надежном и экономически эффективном технологическом фундаменте.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                <p>
                                    Обычное свободное время, когда наша свобода выбора не ограничена, мы создаем решения, которые помогают бизнесу достигать максимальных результатов. Мы предлагаем комплексный подход к решению задач, учитывая все аспекты и возможности.
                                </p>
                                <p>
                                    Мы обеспечиваем полный спектр услуг, начиная от анализа и планирования до реализации и поддержки. Наша команда профессионалов работает над каждым проектом с максимальной отдачей, используя современные технологии и проверенные методики для достижения наилучших результатов.
                                </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="services-more mt-100 mt-xs-30">
                            <h2 className="mb-20">Самые популярные услуги</h2>
                            <div className="row services-style-one-items">
                                {ServicesV1Data.filter(service => service.id !== id).slice(0, 3).map(service =>
                                    <div 
                                        className="col-lg-4 col-md-6 single-item" 
                                        key={service.id}
                                        onMouseEnter={() => handleMouseEnter(service.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className={`services-style-one-item ${activeServiceId === service.id ? 'active' : ''}`}>
                                            <div className="icon">
                                            <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="Image Not Found" width={75} height={60} />
                                            <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} />
                                            </div>
                                            <h4>
                                                <Link to={`/service-details/${service.id}`}>{service.title}</Link>
                                            </h4>
                                            <p>{service.text}</p>
                                            <Link className="btn-full" to={`/service-details/${service.id}`}>
                                                Узнать больше <i className="fas fa-arrow-right" />
                                            </Link>
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