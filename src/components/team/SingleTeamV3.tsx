import { Link } from "react-router-dom";

interface SpecialistDetails {
    category?: string;
    stack?: string[];
    description?: string;
}

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
    specialistDetails?: SpecialistDetails;
}

interface SingleTeamV3Props {
    team: DataType;
    onOpenSpecialist: (team: DataType) => void;
}

const SingleTeamV3 = ({ team, onOpenSpecialist }: SingleTeamV3Props) => {
    const { id, name, specialistDetails, thumb } = team;
    const photoSrc = thumb ? `/assets/team/${thumb}` : "/assets/team/artur.jpg";

    return (
        <>
            <div className="team-style-three-item">
                <div className="thumb">
                    <Link to={`/team-details/${id}`}>
                        <img 
                            src={photoSrc} 
                            alt={name || 'Члены команды'}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                                borderRadius: '10px'
                            }}
                        />
                    </Link>
                </div>
                <div className="info">
                    <h4><Link to={`/team-details/${id}`} style={{ whiteSpace: 'pre-wrap' }}>{name}</Link></h4>
                    {specialistDetails && (
                        <button
                            type="button"
                            className="tech-block-btn team-card-btn"
                            onClick={() => onOpenSpecialist(team)}
                        >
                            о ведущем специалисте
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleTeamV3;