interface TeamMemberCardProps {
    id: number;
    name: string;
    role: string;
    description: string;
}

const TeamMemberCard = ({ name }: TeamMemberCardProps) => {
    // Разделяем имя и фамилию
    const nameParts = name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0] || '';

    return (
        <div className="team-member-card team-style-three-item">
            <div className="thumb">
                <img 
                    src="/assets/team/artur.jpg" 
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: '30px'
                    }}
                />
            </div>
            <div className="info">
                <h4>
                    {lastName && <span className="last-name">{lastName}</span>}
                    {firstName && <span className="first-name">{firstName}</span>}
                </h4>
                <span>стэк</span>
            </div>
        </div>
    );
};

export default TeamMemberCard;

