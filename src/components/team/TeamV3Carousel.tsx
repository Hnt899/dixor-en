import { useState } from "react";
import TeamV3Data from "../../../src/assets/jsonData/team/TeamV3Data.json";
import SplitText from "../animation/SplitText.jsx";
import arrowLongRight from '/assets/img/icon/arrow-long-right.png';
import { Link } from "react-router-dom";

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

const TeamV3Carousel = ({ hasTitle, sectionClass }: DataType) => {
    const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

    const handlePrevMember = () => {
        setCurrentMemberIndex((prev) => (prev === 0 ? TeamV3Data.length - 1 : prev - 1));
    };

    const handleNextMember = () => {
        setCurrentMemberIndex((prev) => (prev === TeamV3Data.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className={`team-style-three-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>
                {/* Team Title  */}
                {hasTitle &&
                    <div className="container">
                        <div className="site-heading">
                            <div className="row align-center">
                                <div className="col-lg-6">
                                    <h4 className="sub-title">Члены команды</h4>
                                    <h2 className="title split-text">
                                        <SplitText
                                            delay={120}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Наша команда
                                        </SplitText>
                                    </h2>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/team" className="btn-circle">
                                        <div className="button-content">
                                            <span><img src={arrowLongRight} alt="Image Not Found" /></span> <strong>Вся команда</strong>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Сетка участников с каруселью */}
                <section className="team-members-section">
                    <div className="container-full">
                        <div className="team-members-grid">
                            <div 
                                className="team-members-carousel"
                                style={{
                                    '--carousel-offset': `${currentMemberIndex * 100}%`
                                } as React.CSSProperties}
                            >
                                {TeamV3Data.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={`team-member-wrapper ${index === currentMemberIndex ? 'active' : ''}`}
                                    >
                                        <div className="team-member-card team-style-three-item">
                                            <div className="thumb">
                                                <img 
                                                    src="/assets/team/artur.jpg"
                                                    alt={member.name}
                                                />
                                            </div>
                                            <div className="info">
                                                <h4>
                                                    {member.name.split(' ').length > 1 && (
                                                        <span className="last-name">{member.name.split(' ').slice(1).join(' ')}</span>
                                                    )}
                                                    <span className="first-name">{member.name.split(' ')[0]}</span>
                                                </h4>
                                                <span>{member.designation}</span>
                                            </div>
                                        </div>
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
            </div>
        </>
    );
};

export default TeamV3Carousel;

