interface TeamMemberCardProps {
    id: number;
    name: string;
    
    description: string;
    photo?: string;
    summary: string;
    stack: string[];
    expertise: string;
    onSelect: () => void;
}

import { useEffect, useState } from "react";

const TeamMemberCard = ({ name, photo, summary, stack, expertise, onSelect }: TeamMemberCardProps) => {
    // Разделяем имя и фамилию
    const nameParts = name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0] || '';
    const stackPreview = stack?.length ? stack.join(', ') : '';
    const [isMobile, setIsMobile] = useState(false);
    const [isHoverVisible, setIsHoverVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsHoverVisible(false);
        }
    }, [isMobile]);

    const toggleHoverMobile = () => {
        if (!isMobile) return;
        setIsHoverVisible(prev => !prev);
    };

    const handleViewDetails = () => {
        if (isMobile) return;
        onSelect();
    };

    return (
        <div className="team-member-card team-style-three-item">
            <div className="thumb" onClick={toggleHoverMobile}>
                <img
                    src={photo || "/assets/team/artur.jpg"}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: '30px'
                    }}
                />
                <div className={`team-member-hover ${isHoverVisible ? 'show' : ''}`}>
                    <p className="team-member-summary">{summary}</p>
                    <div className="team-member-hover-meta">
                        {stackPreview && (
                            <div>
                                <span>Стэк</span>
                                <p>{stackPreview}</p>
                            </div>
                        )}
                        {expertise && (
                            <div>
                                <span>Экспертиза</span>
                                <p>{expertise}</p>
                            </div>
                        )}
                    </div>
                    {!isMobile && (
                        <button className="team-member-hover-btn" type="button" onClick={handleViewDetails}>
                            Подробнее
                        </button>
                    )}
                </div>
            </div>
            <div className="info">
                <h4>
                    {lastName && <span className="last-name">{lastName}</span>}
                    {firstName && <span className="first-name">{firstName}</span>}
                </h4>
            </div>
        </div>
    );
};

export default TeamMemberCard;

