import "./search.css";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { useState } from "react";
import { VerticalLine } from "components/vertical-line/vertical-line";
import { TravelMode } from "enums/travel-mode";
import { mockTravelResults } from "./travel-result-mock";
import { Button, Divider, Radio, RadioGroup } from "@mui/material";
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
import { formatDate, getTime } from "utils/format-date";
import { LuBackpack as BackPackIcon } from "react-icons/lu";
import { LiaSuitcaseRollingSolid as LittleSuitcaseIcon } from "react-icons/lia";
import { PiSuitcaseRollingDuotone as BigSuitcaseIcon } from "react-icons/pi";

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
                    <h3 className="text-bold m-0">Filtros</h3>
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

function TravelItem({ travel }: { travel: Travel }) {
    return (
        <div className="flex flex-row justify-between w-full items-center">
            <h5 className="m-0 text-bold">{travel.company}</h5>

            <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                    <span className="text-bold">{getTime(travel.departureTime)}</span>
                    <span className="text-silver">{travel.departureAirportCode}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-silver">
                        {/* check if zero stops, case yes transform to Direto, if only one stop transform to 1 parada, if 2 or more stops transform to stops Paradas*/}
                        {travel.stops === 0 ? "Direto" : travel.stops === 1 ? "1 parada" : `${travel.stops} paradas`}
                    </span>
                    <span className="text-silver">{travel.travelTime}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-bold">{getTime(travel.arrivalTime)}</span>
                    <span className="text-silver">{travel.arrivalAirportCode}</span>
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row items-end">
                    <BackPackIcon color="green" size={12} className="mb-[0.1rem]" />
                    <LittleSuitcaseIcon color="green" size={15} />
                    <BigSuitcaseIcon size={17} />
                </div>
                <a href="" className="underline text-[#134074]">
                    Detalhes
                </a>
            </div>
        </div>
    );
}

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
                                    <div className="w-[70%] p-8">
                                        <div className="flex gap-2 flex-col">
                                            <div className="flex flex-row justify-between items-center gap-4">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <h5 className="m-0 text-bold flex flex-row items-center">
                                                        <DeparturingAirplaneIcon size={28} className="mr-2" />
                                                        Ida
                                                    </h5>
                                                    -
                                                    <span className="text-silver">
                                                        {formatDate(result.departureDate)}
                                                    </span>
                                                </div>
                                                {/* <p>
                                                    <span className="text-bold mr-8">Bagagem</span>
                                                </p> */}
                                            </div>
                                            <Divider />
                                            <RadioGroup className="px-1 gap-2">
                                                {result.departure.map((departTravel) => (
                                                    <FormControlLabel
                                                        className="travel-item group/item selection::bg-slate-100"
                                                        value={departTravel.id}
                                                        control={<Radio />}
                                                        label={<TravelItem travel={departTravel} />}
                                                        onClick={(evt) => {
                                                            console.log(evt);
                                                        }}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </div>
                                        {result.arrival && (
                                            <>
                                            <br />
                                                <div className="flex gap-2 flex-col">
                                                    <div className="flex flex-row justify-between items-center gap-4">
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <h5 className="m-0 text-bold flex flex-row items-center">
                                                                <ArrivingAirplaneIcon size={28} className="mr-2" />
                                                                Volta
                                                            </h5>
                                                            -
                                                            <span className="text-silver">
                                                                {formatDate(result.arrivalDate!)}
                                                            </span>
                                                        </div>
                                                        {/* <p>
                                                            <span className="text-bold mr-8">Bagagem</span>
                                                        </p> */}
                                                    </div>
                                                    <Divider />
                                                    <RadioGroup className="px-1 gap-2">
                                                        {result.arrival.map((arrivalTravel) => (
                                                            <FormControlLabel
                                                                className="travel-item group/item selection::bg-slate-100"
                                                                value={arrivalTravel.id}
                                                                control={<Radio />}
                                                                label={<TravelItem travel={arrivalTravel} />}
                                                                onClick={(evt) => {
                                                                    console.log(evt);
                                                                }}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                            </>
                                        )}
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
