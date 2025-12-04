import { Link } from "react-router-dom";
import { trackClick } from "../../utils/yandex-metrika";

const TELEGRAM_URL = "https://t.me/CDI_Agency";
const WHATSAPP_URL = "https://wa.me/79853656294";

const SocialShareV3 = () => {
    return (
        <>
            <li>
                <Link 
                    to={TELEGRAM_URL} 
                    target="_blank" 
                    aria-label="Открыть Telegram"
                    onClick={() => {
                        // Отслеживание клика на Telegram в Яндекс.Метрике
                        trackClick('telegram_click', 'link', {
                            action: 'open_telegram',
                            url: TELEGRAM_URL,
                        });
                    }}
                >
                    <i className="fab fa-telegram-plane" />
                </Link>
            </li>
            <li>
                <Link 
                    to={WHATSAPP_URL} 
                    target="_blank" 
                    aria-label="Написать в WhatsApp"
                    onClick={() => {
                        // Отслеживание клика на WhatsApp в Яндекс.Метрике
                        trackClick('whatsapp_click', 'link', {
                            action: 'open_whatsapp',
                            url: WHATSAPP_URL,
                        });
                    }}
                >
                    <i className="fab fa-whatsapp" />
                </Link>
            </li>
        </>
    );
};

export default SocialShareV3;
