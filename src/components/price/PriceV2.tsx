import { useState } from "react";
import PriceV2Data from "../../../src/assets/jsonData/price/PriceV2Data.json";
import SinglePriceV2 from "./SinglePriceV2";
import SplitText from "../animation/SplitText.jsx";
import ContactModal from "../modal/ContactModal";

const PriceV2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="pricing-style-two-area default-padding bottom-less bg-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                            <div className="site-heading text-center" style={{ width: "100%" }}>

                                <h5 className="sub-title">Лучшие предложения</h5>

                                <h2 className="title" style={{ textAlign: "center", width: "100%", display: "block" }}>
                                    <div className="price-title-line-1" style={{ display: "block", width: "100%", textAlign: "center" }}>
                                        <span className="price-title-part1" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                                            <SplitText
                                                delay={20}
                                                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                                                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                                textAlign="center"
                                            >
                                                {"Выберите\u00A0подходящий"}
                                            </SplitText>
                                        </span>
                                        <span className="price-title-part2-desktop" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                                            <SplitText
                                                delay={20}
                                                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                                                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                                textAlign="center"
                                            >
                                                {"\u00A0формат"}
                                            </SplitText>
                                        </span>
                                    </div>

                                    <div className="price-title-line-2" style={{ display: "block", width: "100%", textAlign: "center", marginTop: "0.5em" }}>
                                        <span className="price-title-part2-mobile" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                                            <SplitText
                                                delay={20}
                                                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                                                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                                textAlign="center"
                                            >
                                                формат
                                            </SplitText>
                                        </span>
                                        <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                                            <SplitText
                                                delay={20}
                                                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                                                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                                textAlign="center"
                                            >
                                                {"\u00A0сотрудничества"}
                                            </SplitText>
                                        </span>
                                    </div>
                                </h2>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="pricing-style-two-items">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="nav nav-tabs pricing-tab-navs" id="nav-tab" role="tablist">
                                    <button
                                        className="nav-link active"
                                        id="nav-id-1"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab1"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab1"
                                        aria-selected="true"
                                    >
                                        <span>Проектная</span>
                                    </button>

                                    <button
                                        className="nav-link"
                                        id="nav-id-2"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab2"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab2"
                                        aria-selected="false"
                                    >
                                        <span>Почасовая работа</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content pricing-tab-content" id="nav-tabContent">

                            {/* Первая вкладка — Проектная */}
                            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-id-1">
                                <div className="row">
                                    {PriceV2Data.yearlyPlans.map(plan => (
                                        <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={plan.id}>
                                            <SinglePriceV2 plan={plan} onOpenModal={openModal} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Вторая вкладка — Почасовая работа */}
                            <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="nav-id-2">
                                <div className="row">
                                    {PriceV2Data.monthlyPlans.map(plan => (
                                        <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={plan.id}>
                                            <SinglePriceV2 plan={plan} onOpenModal={openModal} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default PriceV2;
