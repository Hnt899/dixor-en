import { useState } from 'react';
import BlogV2Data from '../../../src/assets/jsonData/blog/BlogV2Data.json';
import SingleBlogV2 from './SingleBlogV2';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const BlogV2 = ({ sectionClass }: DataType) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleArticles = BlogV2Data.slice(0, 2);
    const hiddenArticles = BlogV2Data.slice(2);

    return (
        <>
            <div className={`blog-area home-blog blog-style-two-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Новости и События</h4>
                                <h2 className="title">
                                    <SplitText
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Последние Статьи
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {visibleArticles.map(blog =>
                            <div className="col-lg-6 col-md-6 mb-30" key={blog.id}>
                                <SingleBlogV2 blog={blog} />
                            </div>
                        )}
                        <div 
                            className="col-12"
                            style={{
                                maxHeight: isExpanded ? '10000px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out',
                                opacity: isExpanded ? 1 : 0,
                                marginTop: isExpanded ? '0' : '0'
                            }}
                        >
                            <div className="row" style={{ paddingTop: isExpanded ? '20px' : '0' }}>
                                {hiddenArticles.map((blog, index) =>
                                    <div 
                                        className="col-lg-6 col-md-6 mb-30" 
                                        key={blog.id}
                                        style={{
                                            transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                                            transition: `transform 0.5s ease-out ${index * 0.1}s, opacity 0.4s ease-out ${index * 0.1}s`,
                                            opacity: isExpanded ? 1 : 0
                                        }}
                                    >
                                        <SingleBlogV2 blog={blog} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {hiddenArticles.length > 0 && (
                        <div className="row">
                            <div className="col-12 text-center" style={{ marginTop: '30px' }}>
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    style={{
                                        padding: '15px 40px',
                                        border: 'none',
                                        background: 'var(--color-primary)',
                                        color: 'var(--color-heading)',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        zIndex: 1,
                                        overflow: 'hidden',
                                        boxSizing: 'border-box'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--dark)';
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--color-primary)';
                                        e.currentTarget.style.color = 'var(--color-heading)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {isExpanded ? 'Скрыть статьи' : 'Показать все статьи'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogV2;