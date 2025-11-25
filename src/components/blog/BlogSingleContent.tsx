import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import team1Thumb from "/assets/img/team/9.jpg"
import BlogPostComments from './BlogPostComments';
import BlogCommentForm from './BlogCommentForm';
import handleSmoothScroll from '../utilities/handleSmoothScroll';
import SocialShareV3 from '../social/SocialShareV3';
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json";
import Animate from "../animation/Animate";

interface DataType {
    id?: number;
    date?: string;
    dateIcon?: string;
    thumbFull?: string;
    author?: string;
    title?: string;
    text?: string;
}

interface BlogSingleProps {
    blogInfo?: DataType;
    totalBlogs?: number;
    sectionClass?: string;
}

const BlogSingleContent = ({ blogInfo, totalBlogs, sectionClass }: BlogSingleProps) => {
    const { id, date, dateIcon, thumbFull, author } = blogInfo || {};

    // Состояние для модального окна с изображением
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 3;
    const ZOOM_STEP = 0.25;
    const blogContentRef = useRef<HTMLDivElement>(null);

    // Blogs Navigation 
    const currentId = id ? parseInt(id.toString(), 10) : 1;

    // Calculate the previous and next IDs dynamically
    const previousId = currentId === 1 ? totalBlogs : currentId - 1;
    const nextId = currentId === totalBlogs ? 1 : currentId + 1;

    // Get the previous and next project titles
    const previousBlog = BlogV3Data.find((blog) => blog.id === previousId);
    const nextBlog = BlogV3Data.find((blog) => blog.id === nextId);

    // Get the first two words of the project title
    const getFirstTwoWords = (text?: string) => text?.split(' ').slice(0, 2).join(' ') || "No Title";

    // Функция для получения полного пути к изображению
    const getImagePath = (src: string) => {
        if (src.startsWith('/assets/')) {
            return src;
        }
        if (src.startsWith('../')) {
            return `/assets/img/${src.replace('../', '')}`;
        }
        if (src.startsWith('статьи/')) {
            return `/assets/${src}`;
        }
        return `/assets/img/blog/${src}`;
    };

    // Открытие модального окна
    const openModal = (imageSrc: string) => {
        setModalImage(getImagePath(imageSrc));
        setZoomLevel(1);
        document.body.style.overflow = 'hidden';
    };

    // Закрытие модального окна
    const closeModal = () => {
        setModalImage(null);
        setZoomLevel(1);
        document.body.style.overflow = 'auto';
    };

    // Увеличение зума
    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    };

    // Уменьшение зума
    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
    };

    // Сброс зума
    const resetZoom = () => {
        setZoomLevel(1);
    };

    // Обработка клавиатуры
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalImage) {
                closeModal();
            }
        };

        if (modalImage) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalImage]);

    // Добавление обработчиков кликов на изображения в тексте статьи через делегирование событий
    useEffect(() => {
        if (!blogContentRef.current) return;

        let cleanup: (() => void) | null = null;

        // Небольшая задержка для гарантии, что контент полностью загружен
        const timeoutId = setTimeout(() => {
            const container = blogContentRef.current;
            if (!container) return;

            // Обработчик клика через делегирование
            const handleClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                    e.preventDefault();
                    e.stopPropagation();
                    const img = target as HTMLImageElement;
                    const src = img.getAttribute('src');
                    if (src) {
                        openModal(src);
                    }
                }
            };

            // Обработчик наведения для всех изображений
            const handleMouseEnter = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                    const img = target as HTMLImageElement;
                    img.style.opacity = '0.9';
                }
            };

            const handleMouseLeave = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                    const img = target as HTMLImageElement;
                    img.style.opacity = '1';
                }
            };

            // Добавляем обработчики на контейнер
            container.addEventListener('click', handleClick, true);
            container.addEventListener('mouseenter', handleMouseEnter, true);
            container.addEventListener('mouseleave', handleMouseLeave, true);

            // Делаем все изображения кликабельными
            const images = container.querySelectorAll('img');
            images.forEach((img) => {
                img.style.cursor = 'pointer';
                img.style.transition = 'opacity 0.3s ease';
            });

            // Сохраняем функцию очистки
            cleanup = () => {
                container.removeEventListener('click', handleClick, true);
                container.removeEventListener('mouseenter', handleMouseEnter, true);
                container.removeEventListener('mouseleave', handleMouseLeave, true);
            };
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (cleanup) {
                cleanup();
            }
        };
    }, [blogInfo?.text, blogInfo?.id]);

    // Дополнительный useEffect для обработки динамически загружаемых изображений
    useEffect(() => {
        if (!blogContentRef.current) return;

        const observer = new MutationObserver(() => {
            const images = blogContentRef.current?.querySelectorAll('img');
            images?.forEach((img) => {
                if (!img.style.cursor) {
                    img.style.cursor = 'pointer';
                    img.style.transition = 'opacity 0.3s ease';
                }
            });
        });

        observer.observe(blogContentRef.current, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
        };
    }, [blogInfo?.text]);

    return (
        <>
            <div className={`blog-area single full-blog full-blog ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="blog-items">
                        <div className="row">
                            <Animate className="animate__animated animate__fadeInUp">
                                <div className="blog-content col-lg-10 offset-lg-1 col-md-12">

                                    {/* blog Single Post */}
                                    <div className="blog-style-one item">
                                        <div className="blog-item-box">
                                            <div className="thumb">
                                                <img 
                                                    src={thumbFull?.startsWith('../') ? `/assets/img/${thumbFull.replace('../', '')}` : thumbFull?.startsWith('статьи/') ? `/assets/${thumbFull}` : `/assets/img/blog/${thumbFull}`} 
                                                    width={1075} 
                                                    height={546} 
                                                    alt="Thumb"
                                                    style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                                                    onClick={() => {
                                                        if (thumbFull) {
                                                            const fullPath = thumbFull.startsWith('../') 
                                                                ? `/assets/img/${thumbFull.replace('../', '')}` 
                                                                : thumbFull.startsWith('статьи/') 
                                                                ? `/assets/${thumbFull}` 
                                                                : `/assets/img/blog/${thumbFull}`;
                                                            openModal(fullPath);
                                                        }
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = '0.9';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.opacity = '1';
                                                    }}
                                                />
                                            </div>
                                            <div className="info">
                                                <div className="meta">
                                                    <ul>
                                                        <li>
                                                            <Link to="#"><i className="fas fa-user-circle" /> {author}</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#"><i className={dateIcon}></i> {date}</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <h2>{blogInfo?.title}</h2>
                                                {blogInfo?.text && <div ref={blogContentRef} dangerouslySetInnerHTML={{ __html: blogInfo.text }} />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post Author */}
                                    <div className="post-author">
                                        <div className="thumb">
                                            <img src={team1Thumb} alt="Thumb" />
                                        </div>
                                        <div className="info">
                                            <h4><Link to="#" onClick={handleSmoothScroll}>Md Sohag</Link></h4>
                                            <p>
                                                Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur elit. Vesti at bulum nec at odio aea the dumm ipsumm ipsum that dolocons rsus mal suada and fadolorit to the consectetur elit. All the Lorem Ipsum generators on the Internet tend.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Post Tags Share */}
                                    <div className="post-tags share">
                                        <div className="tags">
                                            <h4>Tags: </h4>
                                            <Link to="#" onClick={handleSmoothScroll}>Algorithm</Link>
                                            <Link to="#" onClick={handleSmoothScroll}>Data science</Link>
                                        </div>
                                        <div className="social">
                                            <h4>Share:</h4>
                                            <ul>
                                                <SocialShareV3 />
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Post Pagination */}
                                    <div className="post-pagi-area">
                                        <div className="post-previous">
                                            <Link to={`/blog-single/${previousId}`}>
                                                <div className="icon"><i className="fas fa-angle-double-left"></i></div>
                                                <div className="nav-title"> Previous Post <h5>{getFirstTwoWords(previousBlog?.title)}</h5></div>
                                            </Link>
                                        </div>
                                        <div className="post-next">
                                            <Link to={`/blog-single/${nextId}`}>
                                                <div className="nav-title">Next Post <h5>{getFirstTwoWords(nextBlog?.title)}</h5></div>
                                                <div className="icon"><i className="fas fa-angle-double-right"></i></div>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Start Blog Comment */}
                                    <div className="blog-comments">
                                        <div className="comments-area">
                                            <div className="comments-title">
                                                <h3>3 Comments On “Providing Top Quality Cleaning Related Services Charms.”</h3>
                                                <BlogPostComments />
                                            </div>
                                            <div className="comments-form">
                                                <div className="title">
                                                    <h3>Leave a comments</h3>
                                                </div>
                                                <BlogCommentForm />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Animate>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно для просмотра изображений */}
            {modalImage && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'default',
                        overflow: 'hidden'
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            closeModal();
                        }
                    }}
                    tabIndex={-1}
                >
                    {/* Контейнер для изображения */}
                    <div 
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '60px 20px 100px 20px',
                            overflow: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                        >
                            <img 
                                src={modalImage}
                                alt="Full size"
                                style={{
                                    maxWidth: `${100 * zoomLevel}%`,
                                    maxHeight: `${100 * zoomLevel}%`,
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    transition: 'transform 0.3s ease',
                                    transform: `scale(${zoomLevel})`,
                                    transformOrigin: 'center center'
                                }}
                            />
                            {/* Кнопка закрытия */}
                            <button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    color: '#fff',
                                    fontSize: '32px',
                                    cursor: 'pointer',
                                    padding: '5px 15px',
                                    fontWeight: 'bold',
                                    borderRadius: '50%',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    lineHeight: '1',
                                    transition: 'all 0.3s ease',
                                    zIndex: 10000
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    
                    {/* Панель управления зумом */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(0, 0, 0, 0.8)',
                            padding: '12px 20px',
                            borderRadius: '30px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            zIndex: 10001
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка уменьшения */}
                        <button
                            onClick={zoomOut}
                            disabled={zoomLevel <= MIN_ZOOM}
                            style={{
                                background: zoomLevel <= MIN_ZOOM ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '24px',
                                cursor: zoomLevel <= MIN_ZOOM ? 'not-allowed' : 'pointer',
                                padding: '8px 15px',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                opacity: zoomLevel <= MIN_ZOOM ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (zoomLevel > MIN_ZOOM) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (zoomLevel > MIN_ZOOM) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                }
                            }}
                        >
                            −
                        </button>
                        
                        {/* Индикатор уровня зума */}
                        <div
                            style={{
                                color: '#fff',
                                fontSize: '14px',
                                minWidth: '60px',
                                textAlign: 'center',
                                fontFamily: 'monospace'
                            }}
                        >
                            {Math.round(zoomLevel * 100)}%
                        </div>
                        
                        {/* Кнопка увеличения */}
                        <button
                            onClick={zoomIn}
                            disabled={zoomLevel >= MAX_ZOOM}
                            style={{
                                background: zoomLevel >= MAX_ZOOM ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '24px',
                                cursor: zoomLevel >= MAX_ZOOM ? 'not-allowed' : 'pointer',
                                padding: '8px 15px',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                opacity: zoomLevel >= MAX_ZOOM ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (zoomLevel < MAX_ZOOM) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (zoomLevel < MAX_ZOOM) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                }
                            }}
                        >
                            +
                        </button>
                        
                        {/* Кнопка сброса зума */}
                        <button
                            onClick={resetZoom}
                            disabled={zoomLevel === 1}
                            style={{
                                background: zoomLevel === 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '16px',
                                cursor: zoomLevel === 1 ? 'not-allowed' : 'pointer',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                transition: 'all 0.3s ease',
                                opacity: zoomLevel === 1 ? 0.5 : 1,
                                marginLeft: '10px'
                            }}
                            onMouseEnter={(e) => {
                                if (zoomLevel !== 1) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (zoomLevel !== 1) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                }
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogSingleContent;