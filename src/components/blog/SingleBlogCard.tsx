import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumbFull?: string;
    title?: string;
    tag?: string;
    category?: string;
}

const SingleBlogCard = ({ blog }: { blog: DataType }) => {
    const { id, thumbFull, title, tag, category } = blog;
    const displayCategory = tag || category || 'Статьи';

    return (
        <>
            <div className="blog-card-item">
                <Link to={`/blog-post/${id}`} className="blog-card-link">
                    <div className="blog-card-thumb">
                        <div className="blog-card-gradient-bg"></div>
                        {thumbFull && (
                            <img 
                                src={thumbFull.startsWith('статьи/') ? `/assets/${thumbFull}` : thumbFull.startsWith('../') ? `/assets/img/${thumbFull.replace('../', '')}` : `/assets/img/blog/${thumbFull}`} 
                                alt={title || "Blog post"} 
                                width={800} 
                                height={600}
                                className="blog-card-image"
                            />
                        )}
                    </div>
                    <div className="blog-card-content">
                        <div className="blog-card-category">{displayCategory}</div>
                        <h3 className="blog-card-title">{title}</h3>
                    </div>
                    {/* Черный overlay, который заливается снизу вверх по всей карточке */}
                    <div className="blog-card-overlay"></div>
                    {/* Текст, который появляется после заливки */}
                    <div className="blog-card-hover-content">
                        <div className="blog-card-hover-category">{displayCategory}</div>
                        <h3 className="blog-card-hover-title">{title}</h3>
                        <div className="blog-card-hover-readmore">Читать дальше</div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default SingleBlogCard;

