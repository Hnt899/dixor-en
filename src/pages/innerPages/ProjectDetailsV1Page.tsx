import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectDetailsContentV1 from "../../components/project/ProjectDetailsContentV1";
import PortfolioV1Data from "../../../src/assets/jsonData/portfolio/PortfolioV1Data.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";

const ProjectDetailsV1Page = () => {

    const { id } = useParams();
    const data = PortfolioV1Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>CDI - {data ? `${data.text} ${data.textBold}` : 'Детали проекта'}</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title={data ? `${data.text} ${data.textBold}` : 'Детали проекта'} breadCrumb='project' />
                {data && <ProjectDetailsContentV1 projectInfo={data} totalProjects={PortfolioV1Data.length} />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ProjectDetailsV1Page;

