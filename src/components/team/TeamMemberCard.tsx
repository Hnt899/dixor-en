interface TeamMemberCardProps {
    id: number;
    name: string;
    role: string;
    description: string;
    photo?: string;
    summary: string;
    stack: string[];
    expertise: string;
    onSelect: () => void;
}

const TeamMemberCard = ({ name, photo, role, summary, stack, expertise, onSelect }: TeamMemberCardProps) => {
    // Разделяем имя и фамилию
    const nameParts = name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0] || '';
    const stackPreview = stack?.length ? stack.join(', ') : '';

    return (
        <div className="team-member-card team-style-three-item">
            <div className="thumb">
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
                <div className="team-member-hover">
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
                    <button className="team-member-hover-btn" type="button" onClick={onSelect}>
                        Подробнее
                    </button>
                </div>
            </div>
            <div className="info">
                <h4>
                    {lastName && <span className="last-name">{lastName}</span>}
                    {firstName && <span className="first-name">{firstName}</span>}
                </h4>
                <span className="team-member-role-text">{role}</span>
            </div>
        </div>
    );
};

export default TeamMemberCard;

