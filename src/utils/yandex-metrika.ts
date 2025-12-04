/**
 * Утилиты для работы с Яндекс.Метрикой
 * Только необходимые функции для отслеживания форм и контактов
 */

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const METRIKA_ID = 105676447;

/**
 * Инициализация dataLayer для ecommerce
 */
export const initDataLayer = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }
};

/**
 * Отслеживание просмотра страницы (для SPA)
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.ym) return;

  window.ym(METRIKA_ID, 'hit', url, {
    title: title || document.title,
    referer: document.referrer,
  });
};

/**
 * Отслеживание цели
 */
export const trackGoal = (goalId: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.ym) return;

  window.ym(METRIKA_ID, 'reachGoal', goalId, params);
};

/**
 * Отслеживание отправки формы
 */
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  trackGoal('form_submit', {
    form_name: formName,
    ...formData,
  });
};

/**
 * Отслеживание клика по кнопке/ссылке
 */
export const trackClick = (elementName: string, elementType: string = 'button', additionalParams?: Record<string, any>) => {
  trackGoal('click', {
    element_name: elementName,
    element_type: elementType,
    ...additionalParams,
  });
};

/**
 * Отслеживание отправки заявки/заказа
 */
export const trackOrder = (orderData: {
  orderId?: string;
  orderNumber?: string;
  revenue?: number;
  currency?: string;
}) => {
  // Отправка в dataLayer для ecommerce
  if (window.dataLayer) {
    window.dataLayer.push({
      ecommerce: {
        purchase: {
          actionField: {
            transaction_id: orderData.orderId || orderData.orderNumber,
            revenue: orderData.revenue,
            currency: orderData.currency || 'RUB',
          },
          products: [],
        },
      },
    });
  }

  // Отслеживание цели
  trackGoal('order_submit', {
    order_id: orderData.orderId || orderData.orderNumber,
    revenue: orderData.revenue,
    currency: orderData.currency || 'RUB',
  });
};
