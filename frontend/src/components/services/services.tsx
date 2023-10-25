import "./services.css";
import { HorizontalLine } from "components/cavok-colored";
import service1 from "assets/images/service1.png";
import service2 from "assets/images/service2.png";
import service3 from "assets/images/service3.png";
import service4 from "assets/images/service4.png";

interface ServicesProps {
    withoutTitle?: boolean;
}

export default function Services(props: ServicesProps) {

    const data: {
        icon: any;
        title: string;
        subTitle: string;
    }[] = [
        {
            icon: service1,
            title: "Get Best Prices",
            subTitle: "Pay through our application and save thousands and get amazing rewards.",
        },
        {
            icon: service2,
            title: "Covid Safe",
            subTitle: "We have all the curated hotels that have all the precaution for a covid safe environment.",
        },
        {
            icon: service3,
            title: "Pagamento",
            subTitle:
                "Aqui você encontra flexibilidade nas formas de pagamento podendo dividir em até 12x no cartão de crédito ou PIX a vista.",
        },
        {
            icon: service4,
            title: "Suporte ao Cliente",
            subTitle: "Iremos te auxiliar nas cotações, dúvidas, seguro viagem e etc.",
        },
    ];

    return (
        <div className="services">
            {
                !props.withoutTitle && 
                <div className="services-title">
                    <h3>Por que escolher a gente?</h3>
                    <HorizontalLine />
                </div>
            }
            <div className="services-body">
                {data.map((item, index) => {
                    return (
                        <div className="service">
                            <div className="icon">
                                <img src={item.icon} alt="" />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.subTitle}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
