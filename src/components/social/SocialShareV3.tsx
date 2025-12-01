import { Link } from "react-router-dom";

const TELEGRAM_URL = "https://t.me/CDI_Agency";
const WHATSAPP_URL = "https://wa.me/79853656294";

const SocialShareV3 = () => {
    return (
        <>
            <li>
                <Link to={TELEGRAM_URL} target="_blank" aria-label="Открыть Telegram">
                    <i className="fab fa-telegram-plane" />
                </Link>
            </li>
            <li>
                <Link to={WHATSAPP_URL} target="_blank" aria-label="Написать в WhatsApp">
                    <i className="fab fa-whatsapp" />
                </Link>
            </li>
        </>
    );
};

export default SocialShareV3;
