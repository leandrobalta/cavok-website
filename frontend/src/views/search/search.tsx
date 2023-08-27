import { Accordion, useAccordionButton, Form } from "react-bootstrap";
import "./search.css";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { CavokButton } from "components/cavok-colored";
import { useState } from "react";
import { VerticalLine } from "components/vertical-line/vertical-line";

interface DropdownFilterChecksProps {
    title: string;
    options: CheckOption[];
    selected?: string;
    onChange?: (value: string) => void;
}

interface DropdownPriceFilterProps {
    title: string;
    price: PriceFilter;
    onChange: (value: PriceFilter) => void;
}

interface CheckOption {
    label: string;
    amount: number;
}

interface PriceFilter {
    min: number;
    max: number;
}

const DropdownFilterChecks = (props: DropdownFilterChecksProps) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(true);

    const onClick = useAccordionButton(props.title, () => {
        console.log("clicked");
        setIsCollapseOpen(!isCollapseOpen);
    });

    const allAmount = props.options.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <>
            <div className="filter-content-item" onClick={onClick}>
                <h6>{props.title}</h6>
                <DropdownIcon size={25} className={isCollapseOpen ? "rotate" : ""} />
            </div>
            <Accordion.Collapse eventKey={props.title}>
                <div className="filter-content-item-body">
                    <div className="filter-content-item-body-line">
                        <Form.Check type="checkbox" label={`Todos as ${props.title}`} id="todos" defaultChecked />
                        <span>{allAmount}</span>
                    </div>
                    {props.options.map((option, index) => {
                        return (
                            <div className="filter-content-item-body-line">
                                <Form.Check key={index} type="checkbox" label={option.label} id={option.label} />
                                <span>{option.amount}</span>
                            </div>
                        );
                    })}
                </div>
            </Accordion.Collapse>
        </>
    );
};

const DropdownPriceFilter = (props: DropdownPriceFilterProps) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(true);

    const onClick = useAccordionButton(props.title, () => {
        console.log("clicked");
        setIsCollapseOpen(!isCollapseOpen);
    });

    return (
        <>
            <div className="filter-content-item" onClick={onClick}>
                <h6>{props.title}</h6>
                <DropdownIcon size={25} className={isCollapseOpen ? "rotate" : ""} />
            </div>
            <Accordion.Collapse eventKey={props.title}>
                <div className="filter-content-item-body">
                    <div className="filter-content-item-body-line price-input">
                        <Form.Control
                            type="number"
                            value={props.price.min}
                            onChange={(e) => props.onChange({ ...props.price, min: Number(e.target.value) })}
                            isInvalid={props.price.min > props.price.max}
                        />
                        -
                        <Form.Control
                            type="number"
                            value={props.price.max}
                            onChange={(e) => props.onChange({ ...props.price, max: Number(e.target.value) })}
                            isInvalid={props.price.min > props.price.max}
                        />
                        <CavokButton>Aplicar</CavokButton>
                    </div>
                </div>
            </Accordion.Collapse>
        </>
    );
};

export default function Search() {
    //states
    const [stopOptions, setStopOptions] = useState<CheckOption[]>([
        { label: "Direto", amount: 0 },
        { label: "1 parada", amount: 1 },
        { label: "2 ou mais paradas", amount: 3 },
    ]);
    const [companyOptions, setCompanyOptions] = useState<CheckOption[]>([
        { label: "Gol", amount: 0 },
        { label: "Azul", amount: 1 },
        { label: "Latam", amount: 3 },
    ]);
    const [price, setPrice] = useState<PriceFilter>({ min: 0, max: 1000 });

    const mockTravelResults = [
        {
            id: 1,
            price: 100,
            stops: 0,
            company: "Gol",
            departure: "2021-10-10T10:00:00.000Z",
            arrival: "2021-10-10T11:00:00.000Z",
        },
        {
            id: 2,
            price: 200,
            stops: 1,
            company: "Azul",
            departure: "2021-10-10T10:00:00.000Z",
            arrival: "2021-10-10T11:00:00.000Z",
        },
        {
            id: 3,
            price: 300,
            stops: 2,
            company: "Latam",
            departure: "2021-10-10T10:00:00.000Z",
            arrival: "2021-10-10T11:00:00.000Z",
        },
    ];

    //handlers
    const onPriceChange = (value: PriceFilter) => {
        if (value.min < 0) return;
        if (value.max < 0) return;

        setPrice(value);
    };

    return (
        <div className="search">
            <div className="search-header">
                <h3>header</h3>
            </div>
            <div className="search-body">
                <div className="side-bar">
                    <Accordion
                        alwaysOpen
                        className="side-bar-filter"
                        defaultActiveKey={["Paradas", "Companhias", "Preço"]}
                    >
                        <div className="filter">
                            <div className="filter-title">
                                <h3>Filtros</h3>
                            </div>
                            <hr />
                            <div className="filter-content">
                                <DropdownFilterChecks title="Paradas" options={stopOptions} />
                                <hr />
                                <DropdownFilterChecks title="Companhias" options={companyOptions} />
                                <hr />
                                <DropdownPriceFilter price={price} title="Preço" onChange={onPriceChange} />
                            </div>
                        </div>
                    </Accordion>
                    <div className="information">
                        <h3>Atenção</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur metus quis eros
                            euismod, vitae varius dolor gravida. Cras sem diam, viverra sit amet nibh fringilla,
                            vulputate posuere erat. Phasellus sagittis eu mauris sit amet imperdiet.
                        </p>
                        <p>
                            Phasellus ac sagittis nunc. Duis congue, est eu convallis ultricies, augue urna faucibus
                            massa, a vulputate ex nisi at lacus. Nullam gravida pretium nunc vulputate sodales.
                        </p>
                    </div>
                </div>
                <div className="search-result">
                    <div className="results">
                        {mockTravelResults.map((result) => {
                            return (
                                <div className="result-card">
                                    <div className="flight-holder">
                                        <div className="flight-holder-header">
                                            IDA
                                        </div>
                                    </div>
                                    <VerticalLine />
                                    <div className="price-box">
                                        <div className="price-box-header">{result.price}</div>
                                        <div className="price-box-details">
                                            <span>1 adulto: R${result.price}</span>
                                            <span>taxa: R$0</span>
                                            <CavokButton>REALIZAR PEDIDO</CavokButton>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
