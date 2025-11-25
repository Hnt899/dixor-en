import LayoutV1 from '../../components/layouts/LayoutV1';
import BlogStandardContent from '../../components/blog/BlogStandardContent';
import DarkClass from '../../components/classes/DarkClass';
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';
import { useEffect } from 'react';

const BlogStandardPage = () => {
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
    }, []);

    return (
        <>
            <Helmet>
                <title>CDI - Блог</title>
            </Helmet>

            <LayoutV1>
                <BlogStandardContent sectionClass='default-padding-bottom' />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogStandardPage;