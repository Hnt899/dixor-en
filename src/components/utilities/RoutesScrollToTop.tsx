import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RoutesScrollToTop = () => {
    // Extracts pathname property (key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
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
    }, [pathname]);

    // Return null since this component does not need to render anything
    return null;
}

export default RoutesScrollToTop;