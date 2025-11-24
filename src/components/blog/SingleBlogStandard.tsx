import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumbFull?: string;
    date?: string;
    title?: string;
    text?: string;
    author?: string;
}

const SingleBlogStandard = ({ blog }: { blog: DataType }) => {
    // 'id' теперь нужен для ссылки
    const { id, thumbFull, date, title, text, author } = blog

    return (
        <>
            <div className="blog-style-one item">
                <div className="thumb">
                    {/* Ссылка теперь ведет на отдельную страницу поста */}
                    <Link to={`/blog-post/${id}`}>
                        <img src={thumbFull?.startsWith('статьи/') ? `/assets/${thumbFull}` : `/assets/img/blog/${thumbFull}`} alt="Image Not Found" width={1500} height={750} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta">
                        <ul>
                            <li>
                                {/* Ссылка ведет на /blog (список) */}
                                <Link to="/blog">{author}</Link>
                            </li>
                            <li>
                                {date}
                            </li>
                        </ul>
                    </div>
                    <h2>
                        {/* Ссылка теперь ведет на отдельную страницу поста */}
                        <Link to={`/blog-post/${id}`}>{title}</Link>
                    </h2>
                    <p>{text}</p>
                    
                    {/* ИСПРАВЛЕНИЕ: 
                      Возвращаем кнопку "Читать далее" и 
                      ссылаем ее на отдельную страницу.
                    */}
                    <Link className="button-regular" to={`/blog-post/${id}`}>
                        Читать далее <i className="fas fa-arrow-right"></i>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default SingleBlogStandard;