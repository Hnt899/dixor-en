interface SpecialistDetails {
    name: string;
    category: string;
    stack: string[];
    description: string;
    thumb?: string;
    photo?: string;
}

interface TeamSpecialistModalProps {
    specialist: SpecialistDetails | null;
    isOpen: boolean;
    onClose: () => void;
}

const TeamSpecialistModal = ({ specialist, isOpen, onClose }: TeamSpecialistModalProps) => {
    if (!isOpen || !specialist) {
        return null;
    }

    return (
        <div className="specialist-modal-overlay" onClick={onClose}>
            <div className="specialist-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="specialist-modal-close"
                    onClick={onClose}
                    type="button"
                    aria-label="Закрыть окно о ведущем специалисте"
                >
                    ×
                </button>
                <div className="specialist-modal-content">
                    <div className="specialist-modal-photo">
                        <img
                            src={specialist.photo || (specialist.thumb ? `/assets/team/${specialist.thumb}` : "/assets/team/artur.jpg")}
                            alt={specialist.name}
                            style={{
                                width: '100%',
                                maxWidth: '320px',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '16px'
                            }}
                        />
                    </div>
                    <div className="specialist-modal-info">
                        <div className="specialist-modal-category">{specialist.category}</div>
                        <h3 className="specialist-modal-name">{specialist.name}</h3>
                        <div className="specialist-modal-stack">
                            <h4 className="specialist-stack-title">Стэк:</h4>
                            <div className="specialist-stack-badges">
                                {specialist.stack.map((tech, index) => (
                                    <span key={index} className="specialist-stack-badge">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="specialist-modal-description">
                            <h4 className="specialist-description-title">О специолисте:</h4>
                            <p>{specialist.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSpecialistModal;

