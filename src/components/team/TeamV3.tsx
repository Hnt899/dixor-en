import arrowLongRight from '/assets/img/icon/arrow-long-right.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import TeamV3Data from "../../../src/assets/jsonData/team/TeamV3Data.json";
import SingleTeamV3 from './SingleTeamV3';
import SplitText from "../animation/SplitText.jsx";
import TeamSpecialistModal from "./TeamSpecialistModal";

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

type TeamMember = (typeof TeamV3Data)[number];

interface SpecialistModalPayload {
    name: string;
    category: string;
    stack: string[];
    description: string;
}

const TeamV3 = ({ hasTitle, sectionClass }: DataType) => {
    const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistModalPayload | null>(null);

    const handleOpenSpecialist = (team: TeamMember) => {
        if (!team.specialistDetails) return;

        const { category, stack, description, name } = {
            name: undefined,
            ...team.specialistDetails
        };

        setSelectedSpecialist({
            category,
            stack,
            description,
            name: name || team.name || 'Ведущий специалист'
        });
    };

    const handleCloseSpecialist = () => setSelectedSpecialist(null);

    return (
        <>
            <div className={`team-style-three-area default-padding bottom-less team-members-section team-page-grid ${sectionClass ? sectionClass : ""}`}>

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

                <div className="container team-grid-container">
                    <div className="team-grid-row">
                        {TeamV3Data.map(team => (
                            <div className="team-grid-card" key={team.id}>
                                <SingleTeamV3 team={team} onOpenSpecialist={() => handleOpenSpecialist(team)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <TeamSpecialistModal
                isOpen={!!selectedSpecialist}
                specialist={selectedSpecialist}
                onClose={handleCloseSpecialist}
            />
        </>
    );
};

export default TeamV3;