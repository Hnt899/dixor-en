/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';

const HeaderNewsLetter = () => {

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') || '').trim();

        // Простая проверка на заполненность
        if (!email) {
            toast.error("Введите e-mail");
            return;
        }

        // Простая валидация формата почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Введите корректный e-mail");
            return;
        }

        try {
            const response = await fetch("/email_request.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: new URLSearchParams({ email }).toString(),
            });

            // Пытаемся прочитать JSON-ответ от PHP
            const data = await response.json().catch(() => null);

            if (!response.ok || !data || !data.success) {
                const errorText = data?.error || "Ошибка при отправке. Попробуйте позже.";
                toast.error(errorText);
                return;
            }

            form.reset();
            toast.success(data.message || "Спасибо! Мы свяжемся с вами по почте.");
        } catch (error) {
            console.error("Email request error:", error);
            toast.error("Не удалось отправить email. Попробуйте позже.");
        }
    };

    return (
        <>
            <form onSubmit={handleForm}>
                <div className="input-group stylish-input-group">
                    <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="form-control"
                        name="email"
                        autoComplete="off"
                    />
                    <span className="input-group-addon">
                        <button type="submit">
                            <i className="fas fa-arrow-right" />
                        </button>
                    </span>
                </div>
            </form>
        </>
    );
};

export default HeaderNewsLetter;
