import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumbLight?: string;
    text?: string;
    textBold?: string;
}

const SinglePortfolioV1Light = ({ portfolio }: { portfolio: DataType }) => {
    const { id, thumbLight, text, textBold } = portfolio

    return (
        <>
            <div className="portfolio-style-one-item">
                <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}>
                    <img 
                        src={`/assets/img/portfolio/${thumbLight}`} 
                        alt={`Кейс: ${text} ${textBold}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </div>
                <div className="info">
                    <h2><Link to={`/project/${id}`}>{text} <strong>{textBold}</strong></Link></h2>
                    <Link className="btn-animation mt-30" to={`/project/${id}`}><i className="fas fa-arrow-right" /> <span>Подробнее</span></Link>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV1Light;