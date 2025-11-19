import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
}

const SingleTeamV3 = ({ team }: { team: DataType }) => {
    const { id, thumb, name, designation } = team

    return (
        <>
            <div className="team-style-three-item">
                <div className="thumb">
                    <Link to={`/team-details/${id}`}>
                        <div style={{
                            width: '600px',
                            height: '650px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            color: '#000',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}>
                            650x600
                        </div>
                    </Link>
                </div>
                <div className="info">
                    <h4><Link to={`/team-details/${id}`}>{name}</Link></h4>
                    <span>{designation}</span>
                </div>
            </div>
        </>
    );
};

export default SingleTeamV3;