import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    thumbLight?: string;
    text?: string;
    textBold?: string;
}

interface SinglePortfolioV1Props {
    portfolio: DataType;
    usePlaceholderLogo?: boolean;
    placeholderIndex?: number;
}

const SinglePortfolioV1 = ({ portfolio, usePlaceholderLogo = false, placeholderIndex = 1 }: SinglePortfolioV1Props) => {
    const { id, thumb, text, textBold, thumbLight } = portfolio

    // Функция для получения правильного пути к изображению
    const getImagePath = (imagePath?: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('мобильнык/') || imagePath.startsWith('ux ui/') || imagePath.startsWith('сайт/') || imagePath.startsWith('бренд/')) {
            return `/assets/${imagePath}`;
        }
        return `/assets/img/portfolio/${imagePath}`;
    };

    // Для блока "Недавние работы" используем заглушки логотипов
    const getPlaceholderLogo = () => {
        if (usePlaceholderLogo && placeholderIndex >= 1 && placeholderIndex <= 7) {
            return `/assets/заглушка лого ${placeholderIndex}.jpg`;
        }
        return null;
    };

    const placeholderLogo = getPlaceholderLogo();

    return (
        <>
            <div className="portfolio-style-one-item">
                <div style={{ width: '100%', height: '600px', overflow: 'hidden', position: 'relative' }}>
                    {placeholderLogo ? (
                        // Используем заглушку логотипа для блока "Недавние работы"
                        <img 
                            className="regular-img" 
                            src={placeholderLogo} 
                            alt={`Кейс: ${text} ${textBold}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                    ) : (
                        // Обычное изображение для других случаев
                        <>
                            <img 
                                className="regular-img" 
                                src={getImagePath(thumb)} 
                                alt={`Кейс: ${text} ${textBold}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                            {thumbLight && (
                                <img 
                                    className="light-img" 
                                    src={getImagePath(thumbLight)} 
                                    alt={`Кейс: ${text} ${textBold}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="info">
                    <h2><Link to={`/project/${id}`}>{text} <strong>{textBold}</strong></Link></h2>
                    <Link className="btn-animation mt-30" to={`/project/${id}`}><i className="fas fa-arrow-right" /> <span>Подробнее</span></Link>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV1;