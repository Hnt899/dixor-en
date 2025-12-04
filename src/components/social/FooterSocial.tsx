import { useState } from "react";
import { Link } from "react-router-dom";
import { trackClick } from "../../utils/yandex-metrika";

const TELEGRAM_URL = "https://t.me/CDI_Agency";
const WHATSAPP_URL = "https://wa.me/79853656294";
const PHONE_DISPLAY = "+7 985 365 6294";
const PHONE_VALUE = "+79853656294";

const FooterSocial = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyPhone = async () => {
        // Отслеживание клика на телефон в Яндекс.Метрике
        trackClick('phone_click', 'button', {
            action: 'copy_phone',
            phone: PHONE_VALUE,
        });
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(PHONE_VALUE);
            } else {
                const temp = document.createElement("textarea");
                temp.value = PHONE_VALUE;
                temp.style.position = "fixed";
                temp.style.opacity = "0";
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                document.body.removeChild(temp);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Не удалось скопировать номер телефона", error);
        }
    };

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
            <li>
                <button
                    type="button"
                    className={`footer-phone-copy ${copied ? "copied" : ""}`}
                    onClick={handleCopyPhone}
                    aria-label="Скопировать номер телефона"
                    title={copied ? "Скопировано" : `Скопировать ${PHONE_DISPLAY}`}
                >
                    <i className={`fas ${copied ? "fa-check" : "fa-phone-alt"}`} />
                </button>
            </li>
        </>
    );
};

export default FooterSocial;