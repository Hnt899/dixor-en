import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initDataLayer } from '../utils/yandex-metrika';

/**
 * Хук для автоматического отслеживания просмотров страниц в SPA
 */
export const useYandexMetrika = () => {
  const location = useLocation();

  useEffect(() => {
    // Инициализация dataLayer
    initDataLayer();

    // Отслеживание просмотра страницы при изменении маршрута
    const url = location.pathname + location.search;
    trackPageView(url, document.title);
  }, [location]);
};

