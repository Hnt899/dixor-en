import { Link } from "react-router-dom";

interface DataType {
    id: number;
    title: string;
    description: string;
    features: string[];
    priceOriginal: number | null;
    priceDiscounted: number;
    currency: string;
    billingCycle: string;
    priceLabel?: string;
}

const SinglePriceV2 = ({ plan }: { plan: DataType }) => {
    const { title, description, features, priceOriginal, priceDiscounted, currency, billingCycle, priceLabel } = plan;

    return (
        <>
            <div className="pricing-style-two">
                <div className="pricing-header">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
                <ul style={{ flexGrow: 1 }}>
                    {features.map((feature, index) => (
                        <li key={index}>
                            {index < 2 ? <strong>{feature}</strong> : feature}
                        </li>
                    ))}
                </ul>
                <div className="price">
                    <h2>
                        {!priceLabel && priceOriginal && (
                            <del>{currency}{priceOriginal.toLocaleString('ru-RU')}</del>
                        )}
                        {priceLabel ? (
                            <>{priceLabel}</>
                        ) : (
                            <>{currency}{priceDiscounted.toLocaleString('ru-RU')}</>
                        )}
                        <sub> / {billingCycle}</sub>
                    </h2>

                </div>
                <Link className="btn mt-25 btn-sm circle btn-border dark effect" to="/#contact" style={{ marginTop: "auto" }}>Оставить заявку</Link>
            </div>
        </>
    );
};

export default SinglePriceV2;