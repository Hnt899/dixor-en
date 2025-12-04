import { ScrollToTop } from 'react-simple-scroll-up';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const Dependency = () => {
    useEffect(() => {
        // Динамическая загрузка Bootstrap JS только для табов
        if (typeof window !== 'undefined') {
            import('bootstrap/js/dist/tab').then(({ Tab }) => {
                const tabElements = document.querySelectorAll('[data-bs-toggle="tab"], [data-toggle="tab"]');
                tabElements.forEach((el) => {
                    if (el instanceof HTMLElement) {
                        new Tab(el);
                    }
                });
            });
        }
    }, []);

    return (
        <>
            <ScrollToTop symbol={<i className="fas fa-long-arrow-up"></i>} />
            <ToastContainer />
        </>
    );
};

export default Dependency;