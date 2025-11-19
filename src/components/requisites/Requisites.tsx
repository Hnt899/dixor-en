interface RequisitesProps {
    sectionClass?: string;
}

const Requisites = ({ sectionClass }: RequisitesProps) => {
    return (
        <>
            <div className={`requisites-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="requisites-title" style={{ 
                                marginBottom: '40px', 
                                fontSize: '28px', 
                                fontWeight: '600',
                                textAlign: 'center',
                                color: 'var(--color-heading)'
                            }}>
                                Реквизиты
                            </h3>
                            <div className="requisites-content" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '25px',
                                fontSize: '15px',
                                lineHeight: '1.8'
                            }}>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Название организации:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ДЕМЬЯНОВА ЕЛЕНА НИКОЛАЕВНА</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Юридический адрес организации:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>308598, РОССИЯ, БЕЛГОРОДСКАЯ ОБЛ, БЕЛГОРОДСКИЙ Р-Н, С ЧЕРЕМОШНОЕ, УЛ НАГОРНАЯ, Д 55</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>ИНН:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>310263445438</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Расчетный счет:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>40802810800007744407</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>ОГРН/ОГРНИП:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>325310000001892</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Банк:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>АО «ТБанк»</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>БИК банка:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>044525974</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>ИНН банка:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>7710140679</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Корреспондентский счет банка:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>30101810145250000974</p>
                                </div>
                                <div className="requisites-item" style={{
                                    padding: '20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong style={{ 
                                        display: 'block', 
                                        marginBottom: '8px',
                                        color: 'var(--color-heading)',
                                        fontSize: '14px'
                                    }}>Юридический адрес банка:</strong>
                                    <p style={{ margin: 0, color: 'var(--color-text)' }}>127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Requisites;

