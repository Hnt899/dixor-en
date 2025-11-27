import { useState, useEffect } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        budget: '',
        description: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'description' && value.length > 500) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (formData.name.length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Телефон обязателен для заполнения';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        if (formData.description.length > 500) {
            newErrors.description = 'Описание не должно превышать 500 символов';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email || undefined,          // опционально
                    budget: formData.budget || undefined,        // опционально
                    description: formData.description || undefined // уйдёт как comment
                }),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(
                    data.error || 'Ошибка при отправке заявки. Попробуйте позже.'
                );
            }

            alert(
                data.order_number
                    ? `Спасибо! Заявка отправлена.\nНомер заказа: ${data.order_number}`
                    : 'Спасибо! Ваша заявка отправлена.'
            );

            setFormData({
                name: '',
                phone: '',
                email: '',
                budget: '',
                description: ''
            });
            onClose();
        } catch (error: any) {
            console.error('Error sending order:', error);
            alert(error?.message || 'Ошибка при отправке заявки. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <style>{`
                .contact-modal input::placeholder,
                .contact-modal textarea::placeholder {
                    color: var(--color-primary);
                    opacity: 0.6;
                }
                .contact-modal input::-webkit-input-placeholder,
                .contact-modal textarea::-webkit-input-placeholder {
                    color: var(--color-primary);
                    opacity: 0.6;
                }
                .contact-modal input::-moz-placeholder,
                .contact-modal textarea::-moz-placeholder {
                    color: var(--color-primary);
                    opacity: 0.6;
                }
                .contact-modal input:-ms-input-placeholder,
                .contact-modal textarea:-ms-input-placeholder {
                    color: var(--color-primary);
                    opacity: 0.6;
                }
                .contact-modal::-webkit-scrollbar {
                    display: none;
                }
                .modal-content.contact-modal::-webkit-scrollbar {
                    display: none;
                }
                .contact-modal-close-btn::before,
                .contact-modal-close-btn::after {
                    content: none !important;
                    display: none !important;
                }
            `}</style>
            <div
                className="modal-overlay contact-modal-overlay"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <div style={{ position: 'relative', zIndex: 10001 }}>
                    <button
                        className="contact-modal-close-btn"
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontSize: '32px',
                            cursor: 'pointer',
                            width: 'auto',
                            height: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0',
                            zIndex: 10002,
                            outline: 'none',
                            boxShadow: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                    <div
                        className="modal-content contact-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#000000',
                            borderRadius: '10px',
                            padding: '40px',
                            width: '600px',
                            maxWidth: '90vw',
                            height: 'auto',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative',
                            zIndex: 10001,
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <h2 style={{
                            marginBottom: '30px',
                            fontSize: '28px',
                            fontWeight: '600',
                            color: 'var(--color-primary)'
                        }}>
                            Связаться с нами
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--color-primary)'
                                }}>
                                    Имя <span style={{ color: 'var(--color-primary)' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: `1px solid ${errors.name ? 'var(--color-primary)' : '#333333'}`,
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        boxSizing: 'border-box',
                                        background: '#1a1a1a',
                                        color: 'var(--color-primary)'
                                    }}
                                    placeholder="Введите ваше имя"
                                />
                                {errors.name && (
                                    <span style={{ color: 'var(--color-primary)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--color-primary)'
                                }}>
                                    Телефон <span style={{ color: 'var(--color-primary)' }}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: `1px solid ${errors.phone ? 'var(--color-primary)' : '#333333'}`,
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        boxSizing: 'border-box',
                                        background: '#1a1a1a',
                                        color: 'var(--color-primary)'
                                    }}
                                    placeholder="+7 (___) ___-__-__"
                                />
                                {errors.phone && (
                                    <span style={{ color: 'var(--color-primary)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--color-primary)'
                                }}>
                                    Почта (по желанию)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: `1px solid ${errors.email ? 'var(--color-primary)' : '#333333'}`,
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        boxSizing: 'border-box',
                                        background: '#1a1a1a',
                                        color: 'var(--color-primary)'
                                    }}
                                    placeholder="example@mail.com"
                                />
                                {errors.email && (
                                    <span style={{ color: 'var(--color-primary)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--color-primary)'
                                }}>
                                    Бюджет на вашу задачу
                                </label>
                                <input
                                    type="text"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: '1px solid #333333',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        boxSizing: 'border-box',
                                        background: '#1a1a1a',
                                        color: 'var(--color-primary)'
                                    }}
                                    placeholder="Укажите бюджет"
                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--color-primary)'
                                }}>
                                    Описание задачи <span style={{ fontSize: '12px', fontWeight: '400', color: 'var(--color-primary)' }}>(до 500 символов)</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    maxLength={500}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: `1px solid ${errors.description ? 'var(--color-primary)' : '#333333'}`,
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        resize: 'none',
                                        boxSizing: 'border-box',
                                        fontFamily: 'inherit',
                                        background: '#1a1a1a',
                                        color: 'var(--color-primary)'
                                    }}
                                    placeholder="Опишите вашу задачу"
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '5px'
                                }}>
                                    {errors.description && (
                                        <span style={{ color: 'var(--color-primary)', fontSize: '12px' }}>
                                            {errors.description}
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'var(--color-primary)',
                                        marginLeft: 'auto',
                                        opacity: formData.description.length > 450 ? '1' : '0.7'
                                    }}>
                                        {formData.description.length}/500
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: isSubmitting ? '#333' : 'var(--color-primary)',
                                    color: '#000000',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.opacity = '0.9';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.opacity = '1';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Отправка...' : 'Отправить'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactModal;
