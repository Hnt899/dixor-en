import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useThumbParallax = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Сбрасываем transform для всех изображений перед инициализацией
        const resetImages = () => {
            const containers = document.querySelectorAll('.img-container');
            containers.forEach(container => {
                const img = container.querySelector('img') as HTMLElement;
                if (img) {
                    // Сбрасываем все inline стили transform и left
                    img.style.removeProperty('transform');
                    img.style.removeProperty('-webkit-transform');
                    img.style.removeProperty('left');
                    // Принудительно применяем CSS правило
                    void img.offsetHeight;
                }
            });
        };

        resetImages();

        const handleScrollTrigger = () => {
            const width = window.innerWidth;
            if (width > 1023) {
                const containers = document.querySelectorAll('.img-container');

                containers.forEach(container => {
                    const img = container.querySelector('img');
                    if (!img) return;

                    // Убеждаемся, что начальное состояние правильное - центрируем изображение
                    // Используем left: 50% и xPercent: -50 для центрирования
                    gsap.set(img, { 
                        left: '50%',
                        xPercent: -50,
                        scale: 1.4,
                        yPercent: 0
                    });

                    const t4 = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            scrub: true,
                            pin: false,
                            onRefresh: () => {
                                // При обновлении ScrollTrigger восстанавливаем центрирование
                                gsap.set(img, { 
                                    left: '50%',
                                    xPercent: -50,
                                    scale: 1.4,
                                    yPercent: 0
                                });
                            }
                        }
                    });

                    // Анимируем только вертикальное движение, сохраняя центрирование
                    t4.fromTo(img,
                        { 
                            yPercent: -60,
                            xPercent: -50, // Всегда центрируем по горизонтали
                            scale: 1.4
                        },
                        { 
                            yPercent: 60,
                            xPercent: -50, // Всегда центрируем по горизонтали
                            scale: 1.4,
                            ease: 'none' 
                        }
                    );
                });
            } else {
                // На мобильных устройствах сбрасываем все transform
                resetImages();
            }
        };

        // Небольшая задержка для применения CSS правил
        const timeout = setTimeout(() => {
            handleScrollTrigger();
        }, 100);

        return () => {
            clearTimeout(timeout);
            // Убиваем все ScrollTrigger инстансы
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // Сбрасываем transform для всех изображений
            resetImages();
        };
    }, []);
};

export default useThumbParallax;

