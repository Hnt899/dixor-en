import arrowRightTwo from "/assets/img/icon/arrow-right-two.png";
import { toast } from "react-toastify";

interface FormEventHandler {
    // eslint-disable-next-line no-unused-vars
    (event: React.FormEvent<HTMLFormElement>): void;
}

const NewsletterV2 = () => {

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        // ВОТ ПЕРЕВОД:
        toast.success("Спасибо за подписку!")
    }

    return (
        <>
            <form className="newsletter style-two" onSubmit={handleForm}>
                {/* ВОТ ПЕРЕВОД: */}
                <input type="email" placeholder="Ваш Email" className="form-control" name="email" autoComplete="off" />
                <button type="submit"><img src={arrowRightTwo} alt="Image Not Found" /></button>
            </form>
        </>
    );
};

export default NewsletterV2;