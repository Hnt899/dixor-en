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
                    // Сбрасываем все inline стили transform, left и top
                    img.style.removeProperty('transform');
                    img.style.removeProperty('-webkit-transform');
                    img.style.removeProperty('left');
                    img.style.removeProperty('top');
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
                    // Используем top: 50%, left: 50% и xPercent: -50, yPercent: -50 для центрирования
                    gsap.set(img, { 
                        top: '50%',
                        left: '50%',
                        xPercent: -50,
                        yPercent: -50, // Начальное центрирование по вертикали
                        scale: 1.4
                    });

                    const t4 = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            scrub: true,
                            pin: false,
                            onRefresh: () => {
                                // При обновлении ScrollTrigger восстанавливаем центрирование
                                gsap.set(img, { 
                                    top: '50%',
                                    left: '50%',
                                    xPercent: -50,
                                    yPercent: -50, // Начальное центрирование по вертикали
                                    scale: 1.4
                                });
                            }
                        }
                    });

                    // Анимируем вертикальное движение от центра, сохраняя горизонтальное центрирование
                    // yPercent: -50 - это центр, добавляем анимацию от -60 до +60
                    t4.fromTo(img,
                        { 
                            top: '50%',
                            left: '50%',
                            yPercent: -50 - 60, // Начало анимации (вверх от центра)
                            xPercent: -50, // Всегда центрируем по горизонтали
                            scale: 1.4
                        },
                        { 
                            top: '50%',
                            left: '50%',
                            yPercent: -50 + 60, // Конец анимации (вниз от центра)
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

