import { Link } from "react-router-dom"; // Я ВЕРНУЛ ЭТОТ ИМПОРТ

interface DataType {
    id?: number;
    thumb?: string;
    author?: string;
    comment?: number;
    date?: string;
    month?: string;
    title?: string;
}

const SingleBlogV2 = ({ blog }: { blog: DataType }) => {
    const { id, thumb, author, comment, title, date, month } = blog

    return (
        <>
            <div className="home-blog-two">
                <div className="thumb">
                    {/* ИСПРАВЛЕНИЕ: Ссылка ведет на /blog */}
                    <Link to={`/blog-post/${id}`}>
                        <img src={thumb?.startsWith('../') ? `/assets/img/${thumb.replace('../', '')}` : `/assets/img/blog/${thumb}`} alt="Image Not Found" width={800} height={600} />
                    </Link>
                    <div className="date">{date} <strong>{month}</strong></div>
                </div>
                <div className="info">
                    <div className="content">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link to="/blog">{author}</Link>
                                </li>
                                <li>
                                    <Link to="/blog">{comment} Комментариев</Link>
                                </li>
                            </ul>
                        </div>
                        <h3 className="post-title">
                            <Link to={`/blog-post/${id}`}>{title}</Link>
                        </h3>
                        <Link to={`/blog-post/${id}`} className="button-regular">
                            Читать далее <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlogV2;