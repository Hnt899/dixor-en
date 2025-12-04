import ContactForm from "../form/ContactForm";
import SocialShareV2 from "../social/SocialShareV2";
import { trackClick } from "../../utils/yandex-metrika";

interface DataType {
    sectionClass?: string
}

const ContactV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`contact-area overflow-hidden relative ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="contact-style-one-items">
                        <div className="row">
                            <div className="col-tact-stye-one col-lg-4">
                                <div className="contact-style-one-info">
                                    <ul className="contact-address">
                                        <li>
                                            <a 
                                                className="phone-link" 
                                                href="tel:+79853656294"
                                                onClick={() => {
                                                    // Отслеживание клика на телефон в Яндекс.Метрике
                                                    trackClick('phone_click', 'link', {
                                                        action: 'call_phone',
                                                        phone: '+79853656294',
                                                        location: 'contact_page',
                                                    });
                                                }}
                                            >
                                                <i className="fas fa-user-headset" /> +7 985 365 6294
                                            </a>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <h4>Location</h4>
                                                <p>
                                                    Улица Сумская 168 офис 306 <br /> Белгород
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <h4>Official Email</h4>
                                                <a href="mailto:demyanovcdi@mail.ru">demyanovcdi@mail.ru</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <ul className="social-link">
                                                    <SocialShareV2 />
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-tact-stye-one col-lg-7 offset-lg-1">
                                <div className="contact-form-style-one">
                                    <h4 className="sub-title">Have Questions?</h4>
                                    <h2 className="title">Send us a Massage</h2>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactV1;