import "./search.css";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { useState } from "react";
import { VerticalLine } from "components/vertical-line/vertical-line";
import { TravelMode } from "enums/travel-mode";
import { mockTravelResults } from "./travel-result-mock";
import { Button } from "@mui/material";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
    PiAirplaneInFlight as InFLightAirplaneIcon,
    PiAirplaneLandingLight as ArrivingAirplaneIcon,
    PiAirplaneTakeoffLight as DeparturingAirplaneIcon,
} from "react-icons/pi";

interface FilterChecksProps {
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

interface Baggage {
    handBaggage: boolean;
    checkedBaggage: boolean;
}

interface Travel {
    id: number;
    price: number;
    stops: number;
    company: string;
    departureTime: string;
    arrivalAirportCode: string;
    departureAirportCode: string;
    arrivalTime: string;
    departureAirport: string;
    arrivalAirport: string;
    departureCity: string;
    arrivalCity: string;
    tax: number;
    date: string;
    travelTime: string;
    class: string;
    flightNumber: string;
    baggage: Baggage;
}

export interface TravelResult {
    price: number;
    departure: Travel[];
    arrival?: Travel[];
    departureDate: string;
    arrivalDate?: string;
    tax: number;
    totalPrice: number;
}

const FilterChecks = (props: FilterChecksProps) => {
    const allAmount = props.options.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<DropdownIcon />}>
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="filter-content-item-body">
                    <div className="filter-content-item-body-line">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={`Todos as ${props.title}`}
                            id="todos"
                        />
                        <span>{allAmount}</span>
                    </div>
                    {props.options.map((option, index) => {
                        return (
                            <div className="filter-content-item-body-line">
                                <FormControlLabel
                                    control={<Checkbox />}
                                    key={index}
                                    label={option.label}
                                    id={option.label}
                                />
                                <span>{option.amount}</span>
                            </div>
                        );
                    })}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

const SideBarFilter = () => {
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

    //handlers
    const onPriceChange = (value: PriceFilter) => {
        if (value.min < 0) return;
        if (value.max < 0) return;

        setPrice(value);
    };

    return (
        <div className="side-bar">
            <div className="filter">
                <div className="filter-title">
                    <h3>Filtros</h3>
                </div>
                <div className="filter-content">
                    <FilterChecks title="Paradas" options={stopOptions} />
                    <FilterChecks title="Companhias" options={companyOptions} />
                    {/* <DropdownPriceFilter price={price} title="Preço" onChange={onPriceChange} /> */}
                </div>
            </div>
            <div className="information">
                <h3>Atenção</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur metus quis eros
                    euismod, vitae varius dolor gravida. Cras sem diam, viverra sit amet nibh fringilla, vulputate
                    posuere erat. Phasellus sagittis eu mauris sit amet imperdiet.
                </p>
                <p>
                    Phasellus ac sagittis nunc. Duis congue, est eu convallis ultricies, augue urna faucibus massa, a
                    vulputate ex nisi at lacus. Nullam gravida pretium nunc vulputate sodales.
                </p>
                <p>
                    Phasellus ac sagittis nunc. Duis congue, est eu convallis ultricies, augue urna faucibus massa, a
                    vulputate ex nisi at lacus. Nullam gravida pretium nunc vulputate sodales.
                </p>
            </div>
        </div>
    );
};

export default function Search() {
    const generateRandomPrice = () => {
        const value = Math.random() * (10000 - 1000 + 1) + 1000;
        return Number.parseFloat(value.toString()).toFixed(2);
    };

    const generateRandomTax = () => {
        const value = Math.random() * (100 - 10 + 1) + 10;
        return Number.parseFloat(value.toString()).toFixed(2);
    };

    return (
        <div className="search">
            <div className="search-header">
                <h3>header</h3>
            </div>
            <div className="search-body">
                <SideBarFilter />
                <div className="search-result">
                    <div className="results">
                        {mockTravelResults.map((result) => {
                            return (
                                <div className="result-card">
                                    <div className="flight-holder">
                                        {result.departure.map((deparTravel) => (
                                            <div className="flight-holder-conteiner">
                                                <div className="flight-holder-conteiner-header">
                                                    <p>
                                                        <h5 className="text-bold">
                                                            <DeparturingAirplaneIcon size={28} />
                                                            Ida
                                                        </h5>
                                                        <span className="text-silver">{result.departureDate}</span>
                                                    </p>
                                                    <p className="flight-details-airports">
                                                        <p>
                                                            <h5>{deparTravel.departureAirport}</h5>
                                                            <span className="text-silver">
                                                                {deparTravel.departureCity}
                                                            </span>
                                                        </p>
                                                        <InFLightAirplaneIcon size={28} />
                                                        <p>
                                                            <h5>{deparTravel.arrivalAirport}</h5>
                                                            <span className="text-silver">
                                                                {deparTravel.arrivalCity}
                                                            </span>
                                                        </p>
                                                    </p>
                                                    <p>
                                                        <span className="text-bold">Bagagem</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {result.arrival?.map((arrivTravel) => (
                                            <div className="flight-holder-conteiner">
                                                <div className="flight-holder-conteiner-header">
                                                    <p>
                                                        <h5 className="text-bold">
                                                            <ArrivingAirplaneIcon size={28} />
                                                            Volta
                                                        </h5>
                                                        <span className="text-silver">{result.arrivalDate}</span>
                                                    </p>
                                                    <p className="flight-details-airports">
                                                        <p>
                                                            <h5>{arrivTravel.departureAirport}</h5>
                                                            <span className="text-silver">
                                                                {arrivTravel.departureCity}
                                                            </span>
                                                        </p>
                                                        <InFLightAirplaneIcon size={28} />
                                                        <p>
                                                            <h5>{arrivTravel.arrivalAirport}</h5>
                                                            <span className="text-silver">
                                                                {arrivTravel.arrivalCity}
                                                            </span>
                                                        </p>
                                                    </p>
                                                    <p>
                                                        <span className="text-bold">Bagagem</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <VerticalLine /> */}
                                    <div className="price-box">
                                        <div className="price-box-header">
                                            <h3 className="text-bold">R$ {result.price}</h3>
                                            <span className="text-silver">Por adulto e sem taxas</span>
                                        </div>
                                        <div className="price-box-details">
                                            <p>
                                                <span className="text-bold">Adulto: </span>
                                                <span className="text-silver">R${result.price}</span>
                                            </p>
                                            <p>
                                                <span className="text-bold">Taxa:</span>
                                                <span className="text-silver">R${result.tax}</span>
                                            </p>
                                            <p>
                                                <span className="text-bold">VALOR TOTAL:</span>
                                                <span className="text-bold">R$ {result.price + result.tax}</span>
                                            </p>
                                        </div>
                                        <div className="purchase-btn">
                                            <Button variant="contained">REALIZAR PEDIDO</Button>
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
