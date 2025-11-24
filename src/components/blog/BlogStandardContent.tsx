import SingleBlogCard from './SingleBlogCard';
import BlogV3Data from '../../../src/assets/jsonData/blog/BlogV3Data.json';
import Pagination from 'react-paginate';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface DataType {
    sectionClass?: string;
}

// Получаем все уникальные категории из данных
const getAllUniqueTags = (): string[] => {
    const tags = new Set<string>();
    BlogV3Data.forEach(blog => {
        if (blog.tag) {
            tags.add(blog.tag);
        }
    });
    return Array.from(tags).sort();
};

type FilterType = 'all' | string;

const BlogStandardContent = ({ sectionClass }: DataType) => {
    const navigate = useNavigate();
    const { page } = useParams<{ page?: string }>();

    // Filter state - читаем из sessionStorage при загрузке
    const [activeFilter, setActiveFilter] = useState<FilterType>(() => {
        const savedFilter = sessionStorage.getItem('blogPageActiveFilter');
        return (savedFilter || 'all') as FilterType;
    });
    
    // Pagination
    const currentPageNumber = Number(page) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageNumber);
    const [itemsPerPage] = useState(8); // 4 columns x 2 rows = 8 items per page

    useEffect(() => {
        setCurrentPage(currentPageNumber);
        // Читаем фильтр из sessionStorage при загрузке
        const savedFilter = sessionStorage.getItem('blogPageActiveFilter');
        if (savedFilter) {
            setActiveFilter(savedFilter as FilterType);
        }
    }, [currentPageNumber]);

    // Filter blogs based on active filter - теперь используем точное совпадение категорий
    const filteredBlogs = activeFilter === 'all' 
        ? BlogV3Data 
        : BlogV3Data.filter(blog => (blog.tag || '') === activeFilter);

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogData = filteredBlogs.slice(startIndex, endIndex);

    const handlePageClick = (data: any) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        navigate(`/blog?page=${selectedPage}`);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    };

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
        setCurrentPage(1);
        navigate('/blog?page=1');
    };

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    // Получаем все уникальные категории (мемоизируем для оптимизации)
    const filters = useMemo(() => {
        const uniqueTags = getAllUniqueTags();
        return [
            { id: 'all' as FilterType, label: 'Все публикации' },
            ...uniqueTags.map(tag => ({ id: tag as FilterType, label: tag }))
        ];
    }, []);

    return (
        <>
            <div className={`blog-area blog-grid-new ${sectionClass || ''}`}>
                <div className="container">
                    {/* Header */}
                    <div className="blog-header-section">
                        <h1 className="blog-main-title">
                            БЛОГ АГЕНТСТВА<br />
                            <span className="blog-agency-name">CDI</span>
                        </h1>
                    </div>

                    {/* Filter Buttons */}
                    <div className="blog-filter-section">
                        <div className="blog-filters">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`blog-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => handleFilterClick(filter.id)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="blog-grid-container">
                        <div className="row">
                            {currentBlogData.map(blog => (
                                <div className="col-lg-3 col-md-6 mb-30" key={blog.id}>
                                    <SingleBlogCard blog={blog} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="row">
                            <div className="col-md-12 pagi-area text-center">
                                <Pagination
                                    previousLabel={currentPage === 1 ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-left'></i>}
                                    nextLabel={currentPage === totalPages ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-right'></i>}
                                    breakLabel={'...'}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination text-center'}
                                    activeClassName={'active'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogStandardContent;