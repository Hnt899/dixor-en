import ProcessV1 from '../process/ProcessV1';

const ExpertiseV1 = () => {
    return (
        <>
            <div className="container">
                <div className="expertise-area text-center">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading">
                                <h4 className="sub-title">Наш Процесс</h4>
                                <h2 className="title">Лучшие Решения для Вашего Бизнеса</h2>
                            </div>
                        </div>
                    </div>
                    <ProcessV1 />
                </div>
            </div>
        </>
    );
};

export default ExpertiseV1;