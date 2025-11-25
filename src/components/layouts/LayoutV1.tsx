import FooterV3 from "../footer/FooterV3";
import HeaderV7 from "../header/HeaderV7";

interface LayoutProps {
    children?: React.ReactNode;
}

const LayoutV1 = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="smooth-scroll-container">
                <HeaderV7 />
                {children}
                <FooterV3 />
            </div>
        </>
    );
};

export default LayoutV1;