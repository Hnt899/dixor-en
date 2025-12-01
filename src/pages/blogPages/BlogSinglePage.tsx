import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogSingleContent from '../../components/blog/BlogSingleContent';
import DarkClass from '../../components/classes/DarkClass';
import { useParams } from 'react-router-dom';
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json";
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';
import { useEffect } from 'react';

const BlogSinglePage = () => {

    const { id } = useParams();
    const data = BlogV3Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    // Скроллим страницу вверх при загрузке
    useEffect(() => {
        // Мгновенный скролл вверх - используем несколько методов для надежности на мобильных устройствах
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Дополнительные попытки после задержки (на случай, если контент еще загружается)
        const timeout1 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
        
        const timeout2 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 300);
        
        const timeout3 = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 500);
        
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [id]);

    return (
        <>
            <Helmet>
                <title>CDI - Блог CDI</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Блог CDI' breadCrumb='blog-single' />
                {data && <BlogSingleContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogSinglePage;