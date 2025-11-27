import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamMemberCard from "../../components/team/TeamMemberCard";
import TeamSpecialistModal from "../../components/team/TeamSpecialistModal";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import ContactModal from "../../components/modal/ContactModal";
import { toast } from "react-toastify";

const TeamNewPage = () => {
    // Скроллим страницу вверх при загрузке
    useEffect(() => {
        // Убираем hash из URL, если он есть
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        
        // Мгновенный скролл вверх
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Дополнительные попытки после задержки (на случай, если контент еще загружается)
        const timeout1 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
        
        const timeout2 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 300);
        
        const timeout3 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 500);
        
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);
    const [selectedSpecialist, setSelectedSpecialist] = useState<{
        name: string;
        stack: string[];
        description: string;
        category: string;
        photo?: string;
    } | null>(null);
    const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const handleOpenModal = (category: 'frontend' | 'backend' | 'tools') => {
        setSelectedSpecialist({
            name: specialists[category].name,
            stack: specialists[category].stack,
            description: specialists[category].description,
            category: specialists[category].category,
            photo: specialists[category].photo
        });
    };

    const handleCloseModal = () => {
        setSelectedSpecialist(null);
    };

    const handlePrevMember = () => {
        setCurrentMemberIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    };

    const handleNextMember = () => {
        setCurrentMemberIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
    };

    const handleOpenContactModal = () => {
        setIsContactModalOpen(true);
    };

    const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
    };

    const handleCopyEmail = async () => {
        const email = "demyanovcdi@mail.ru";
        try {
            await navigator.clipboard.writeText(email);
            toast.success("Почта скопирована! Напишите нам на почту и мы с вами свяжемся!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            // Fallback для старых браузеров
            const textArea = document.createElement("textarea");
            textArea.value = email;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                toast.success("Почта скопирована! Напишите нам на почту и мы с вами свяжемся!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (err) {
                toast.error("Не удалось скопировать почту");
            }
            document.body.removeChild(textArea);
        }
    };

    // Данные участников команды
    const teamMembers = [
        {
            id: 1,
            name: "Александр Иванов",
            role: "Frontend Developer",
            description: "Специализируется на React и TypeScript, создаёт интуитивные интерфейсы.",
            photo: "/assets/team/просто сотрудник 1.png"
        },
        {
            id: 2,
            name: "Мария Петрова",
            role: "UI/UX Designer",
            description: "Превращает идеи в визуальные решения с фокусом на пользовательский опыт.",
            photo: "/assets/team/просто сотрудник 2.png"
        },
        {
            id: 3,
            name: "Дмитрий Сидоров",
            role: "Backend Developer",
            description: "Разрабатывает масштабируемые серверные решения на Node.js.",
            photo: "/assets/team/просто сотрудник 3.jpg"
        },
        {
            id: 4,
            name: "Георгий Девицкий",
            role: "Project Manager",
            description: "Координирует проекты и обеспечивает эффективную коммуникацию в команде.",
            photo: "/assets/team/просто сотрудник 4.jpg"
        },
        {
            id: 5,
            name: "Игорь Волков",
            role: "DevOps Engineer",
            description: "Настраивает инфраструктуру и автоматизирует процессы разработки.",
            photo: "/assets/team/просто сотрудник 5.jpg"
        },
        {
            id: 6,
            name: "Анна Смирнова",
            role: "Full Stack Developer",
            description: "Работает на всех уровнях стека, от базы данных до фронтенда.",
            photo: "/assets/team/просто сотрудник 6.jpg"
        },
        {
            id: 7,
            name: "Сергей Лебедев",
            role: "Mobile Developer",
            description: "Создаёт нативные и кроссплатформенные мобильные приложения.",
            photo: "/assets/team/просто сотрудник 7.jpg"
        },
        {
            id: 8,
            name: "Эсталина Денисенко",
            role: "QA Engineer",
            description: "Обеспечивает качество продукта через тщательное тестирование.",
            photo: "/assets/team/просто сотрудник 8.jpg"
        },
        {
            id: 9,
            name: "Павел Морозов",
            role: "Tech Lead",
            description: "Руководит технической стратегией и архитектурными решениями.",
            photo: "/assets/team/просто сотрудник 9.jpg"
        },
        {
            id: 10,
            name: "Татьяна Федорова",
            role: "Product Designer",
            description: "Проектирует продукты с учётом бизнес-целей и потребностей пользователей.",
            photo: "/assets/team/просто сотрудник 10.jpg"
        },
        {
            id: 11,
            name: "Ольга Баранка",
            role: "Data Analyst",
            description: "Собирает и интерпретирует продуктовую аналитику, помогает принимать решения на основании данных.",
            photo: "/assets/team/просто сотрудник 11.jpg"
        },
        {
            id: 12,
            name: "Виктория Романова",
            role: "Customer Success Lead",
            description: "Выстраивает процессы сопровождения клиентов и обеспечивает постоянную обратную связь с продуктовой командой.",
            photo: "/assets/team/просто сотрудник 12.png"
        }
    ];

    // Данные ведущих специалистов (используем случайных людей из списка сотрудников)
    const specialists = {
        frontend: {
            name: teamMembers[0].name, // Александр Иванов
            stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Figma"],
            description: "Глава отдела разработки и дизайна, специалист широкого профиля, который поможет вам визуально интерпретировать ваши идеи. Более 8 лет опыта в создании современных веб-приложений. Эксперт в области React-экосистемы и TypeScript, создал десятки успешных проектов для крупных компаний.",
            category: "Frontend",
            photo: teamMembers[0].photo
        },
        backend: {
            name: teamMembers[2].name, // Дмитрий Сидоров
            stack: ["Node.js", "PostgreSQL", "MongoDB", "GraphQL", "AWS"],
            description: "Ведущий backend-разработчик с глубоким пониманием архитектуры масштабируемых систем. Специализируется на создании высоконагруженных серверных решений и микросервисной архитектуры. Опыт работы с облачными платформами и оптимизацией производительности.",
            category: "Backend",
            photo: teamMembers[2].photo
        },
        tools: {
            name: teamMembers[4].name, // Игорь Волков
            stack: ["Docker", "Kubernetes", "Git", "Jest", "Cypress"],
            description: "DevOps-инженер и архитектор инфраструктуры. Автоматизирует процессы разработки и развертывания, обеспечивает стабильность и масштабируемость систем. Эксперт в области контейнеризации, CI/CD и мониторинга приложений.",
            category: "DevOps",
            photo: teamMembers[4].photo
        }
    };

    const frontendTech = [
        "React", "TypeScript", "Next.js", "Tailwind CSS", "Figma"
    ];

    const backendTech = [
        "Node.js", "PostgreSQL", "MongoDB", "GraphQL", "AWS"
    ];

    const otherTech = [
        "Docker", "Kubernetes", "Git", "Jest", "Cypress"
    ];

    return (
        <>
            <Helmet>
                <title>CDI - Команда</title>
            </Helmet>

            <LayoutV1>
                <div className="team-new-page">
                    {/* 1. Hero блок */}
                    <section className="team-hero-section">
                        <div className="container">
                            <div className="team-hero-content">
                                <div className="team-hero-badge">НАША КОМАНДА</div>
                                <h1 className="team-hero-title">Люди, которые создают технологии</h1>
                                <p className="team-hero-subtitle">
                                    Мы объединяем опыт разработки, дизайн и инновации, чтобы создавать цифровые продукты нового поколения.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2. Разделительная линия */}
                    <div className="container">
                        <div className="team-divider-line"></div>
                    </div>

                    {/* 3. Сетка участников */}
                    <section className="team-members-section">
                        <div className="container-full">
                            <div className="team-members-grid">
                                <div 
                                    className="team-members-carousel"
                                    style={{
                                        '--carousel-offset': `${currentMemberIndex * 100}%`
                                    } as React.CSSProperties}
                                >
                                    {teamMembers.map((member, index) => (
                                        <div
                                            key={member.id}
                                            className={`team-member-wrapper ${index === currentMemberIndex ? 'active' : ''}`}
                                        >
                                            <TeamMemberCard
                                                id={member.id}
                                                name={member.name}
                                                role={member.role}
                                                description={member.description}
                                                photo={member.photo}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Стрелки навигации для мобильных */}
                        <div className="team-members-navigation">
                            <button
                                className="team-nav-arrow team-nav-arrow-prev"
                                onClick={handlePrevMember}
                                aria-label="Предыдущий участник"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button
                                className="team-nav-arrow team-nav-arrow-next"
                                onClick={handleNextMember}
                                aria-label="Следующий участник"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </section>

                    {/* 4. Как мы работаем */}
                    <section className="team-philosophy-section">
                        <div className="container-full">
                            <h2 className="team-section-title">Как мы работаем</h2>
                            <div className="team-philosophy-grid">
                                <div className="philosophy-item">
                                    <div className="philosophy-dot"></div>
                                    <div className="philosophy-content">
                                        <h3 className="philosophy-title">Прозрачность</h3>
                                        <p className="philosophy-text">Мы всегда проясняем процесс и сроки. На каждом этапе проекта клиент знает, что происходит, какие задачи выполняются и когда ожидать результаты. Регулярные отчеты и открытая коммуникация — основа нашего подхода к работе.</p>
                                    </div>
                                </div>
                                <div className="philosophy-item">
                                    <div className="philosophy-dot"></div>
                                    <div className="philosophy-content">
                                        <h3 className="philosophy-title">Ответственность</h3>
                                        <p className="philosophy-text">Каждый в команде отвечает за свою зону. Мы берем на себя полную ответственность за качество работы, соблюдение сроков и достижение поставленных целей. Наша репутация строится на надежности и выполнении обязательств.</p>
                                    </div>
                                </div>
                                <div className="philosophy-item">
                                    <div className="philosophy-dot"></div>
                                    <div className="philosophy-content">
                                        <h3 className="philosophy-title">Инновации</h3>
                                        <p className="philosophy-text">Используем современные технологии и избегаем шаблонных решений. Каждый проект для нас — возможность применить лучшие практики индустрии, внедрить новые подходы и создать продукт, который будет актуален долгие годы.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. Стек технологий */}
                    <section className="team-tech-section">
                        <div className="container">
                            <h2 className="team-section-title">Инструменты, которые мы используем</h2>
                            <div className="team-tech-blocks">
                                <div className="tech-block">
                                    <div className="tech-block-header">
                                        <h3 className="tech-block-title">Frontend</h3>
                                        <button className="tech-block-btn" onClick={() => handleOpenModal('frontend')}>о ведущем специалисте</button>
                                    </div>
                                    <div className="team-tech-grid">
                                        {frontendTech.map((tech, index) => (
                                            <div key={index} className="tech-badge">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tech-block">
                                    <div className="tech-block-header">
                                        <h3 className="tech-block-title">Backend</h3>
                                        <button className="tech-block-btn" onClick={() => handleOpenModal('backend')}>о ведущем специалисте</button>
                                    </div>
                                    <div className="team-tech-grid">
                                        {backendTech.map((tech, index) => (
                                            <div key={index} className="tech-badge">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tech-block">
                                    <div className="tech-block-header">
                                        <h3 className="tech-block-title">DevOps</h3>
                                        <button className="tech-block-btn" onClick={() => handleOpenModal('tools')}>о ведущем специалисте</button>
                                    </div>
                                    <div className="team-tech-grid">
                                        {otherTech.map((tech, index) => (
                                            <div key={index} className="tech-badge">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. Цитата лидера */}
                    <section className="team-quote-section">
                        <div className="container">
                            <div className="team-quote-content">
                                <blockquote className="team-quote">
                                    "Мы создаём цифровые продукты, которые живут долго и делают жизнь людей проще."
                                </blockquote>
                                <p className="team-quote-author">— Основатель компании</p>
                                <div className="team-quote-line"></div>
                            </div>
                        </div>
                    </section>

                    {/* 8. CTA блок */}
                    <section className="team-cta-section">
                        <div className="container">
                            <h2 className="team-cta-title">Хотите работать с нами?</h2>
                            <p className="team-cta-subtitle">Мы всегда открыты для новых проектов и талантов.</p>
                            <div className="team-cta-buttons">
                                <button 
                                    onClick={handleOpenContactModal}
                                    className="btn btn-primary team-cta-btn-primary"
                                >
                                    Связаться
                                </button>
                                <button 
                                    onClick={handleCopyEmail}
                                    className="btn btn-secondary team-cta-btn-secondary"
                                >
                                    Стать частью команды
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
                <DarkClass />
                <ThemeDark />
            </LayoutV1>

            {/* Модалка связаться с нами */}
            <ContactModal 
                isOpen={isContactModalOpen} 
                onClose={handleCloseContactModal} 
            />

            <TeamSpecialistModal
                isOpen={!!selectedSpecialist}
                specialist={selectedSpecialist}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default TeamNewPage;

