import "./search.css";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { useState } from "react";
import { VerticalLine } from "components/vertical-line/vertical-line";
import { TravelMode } from "enums/travel-mode";
import { mockTravelResults } from "./travel-result-mock";
import { Button, Divider, Drawer, IconButton, Radio, RadioGroup, makeStyles } from "@mui/material";
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
import { HeroContainer } from "components/hero/hero";
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";
import useWindowDimensions from "hooks/window-dimensions";
import { FaExchangeAlt as ExchangeIcon } from "react-icons/fa";
import { GrClose as CloseIcon } from "react-icons/gr";
import { FiFilter as FilterIcon } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";

interface FilterChecksProps {
    title: string;
    options: CheckOption[];
    selected?: string;
    onChange?: (value: string) => void;
    accordion: boolean;
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
    boardingTax: number;
    totalPrice: number;
}

const FilterChecks = (props: FilterChecksProps) => {
    const allAmount = props.options.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <>
            {props.accordion ? (
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<DropdownIcon />}>
                        <Typography>{props.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="filter-content-item-body">
                            <div className="filter-content-item-body-line">
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label={`Todas as ${props.title}`}
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
            ) : (
                <div className="flex flex-col">
                    <div className="filter-content-item-header">
                        <h5 className="m-0 text-bold">{props.title}</h5>
                    </div>
                    <div className="filter-content-item-body">
                        <div className="filter-content-item-body-line">
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={`Todas as ${props.title}`}
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
                </div>
            )}
        </>
    );
};

function TravelItem({ travel }: { travel: Travel }) {
    const { width, height } = useWindowDimensions();

    return (
        /*<div className="flex flex-row justify-between w-full items-center">*/
        <div className="travel-item">
            <h5 className="m-0 text-bold text-start">{travel.company}</h5>

            <div className="flex flex-row gap-2 justify-center">
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

            <div className="flex flex-row justify-around">
                {width > 370 && (
                    <div className="flex flex-row gap-[0.1rem] items-center justify-center">
                        <BackPackIcon color="green" size={12} />
                        <LittleSuitcaseIcon color="green" size={15} />
                        <BigSuitcaseIcon size={17} />
                    </div>
                )}

                <InfoIcon size={20} color="#134074" />
            </div>
        </div>
    );
}

export default function Search() {
    const { width, height } = useWindowDimensions();
    const [showNewSearch, setShowNewSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const handleSearchDrawerClose = () => {
        setShowNewSearch(false);
    };

    const handleSearchDrawerOpen = () => {
        setShowNewSearch(true);
    };

    const handleFilterDrawerClose = () => {
        setShowFilter(false);
    };

    const handleFilterDrawerOpen = () => {
        setShowFilter(true);
    };

    const handlePlaceOrder = () => {
        navigate("payment");
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
            <>
                <Drawer
                    anchor="left"
                    open={showFilter}
                    PaperProps={{
                        sx: { width: "100%" },
                    }}
                >
                    <div className="flex items-center justify-between p-2">
                        <h1 className="text-4xl m-0 text-bold">Filtros</h1>
                        <IconButton onClick={handleFilterDrawerClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="p-5 flex flex-col gap-4">
                        <FilterChecks accordion={false} title="Paradas" options={stopOptions} />
                        <Divider />
                        <FilterChecks accordion={false} title="Companhias" options={companyOptions} />
                        {/* <DropdownPriceFilter price={price} title="Preço" onChange={onPriceChange} /> */}
                        <Button variant="contained" size="large" onClick={handleFilterDrawerClose}>
                            Aplicar
                        </Button>
                    </div>
                </Drawer>
                <div className="w-[30rem] flex flex-col gap-4 max-md:hidden">
                    <div className="filter">
                        <div className="filter-title">
                            <h3 className="text-bold m-0">Filtros</h3>
                        </div>
                        <div className="filter-content">
                            <FilterChecks accordion title="Paradas" options={stopOptions} />
                            <FilterChecks accordion title="Companhias" options={companyOptions} />
                            {/* <DropdownPriceFilter price={price} title="Preço" onChange={onPriceChange} /> */}
                        </div>
                    </div>
                    <div className="information">
                        <h3 className="text-bold">Atenção</h3>
                        <p>
                            {
                                "As companhias aéreas podem alterar os preços das passagens sem aviso prévio. Garantimos suas passagens somente após a emissão dos bilhetes e envio dos tickets por e-mail."
                            }
                        </p>
                        <p>
                            {
                                "Os valores informados não contemplam as taxas para despacho de bagagens. Você poderá adicionar sua bagagem na página de pagamento."
                            }
                        </p>
                        <p>
                            {
                                "A Cavok Viagens realizará o seu check in e enviaremos a você o cartão de embarque atualizado até 24 horas antes do voo."
                            }
                        </p>
                    </div>
                </div>
            </>
        );
    };

    const SearchHeader = () => {
        return (
            <>
                <Drawer
                    anchor="left"
                    open={showNewSearch}
                    PaperProps={{
                        sx: { width: "100%" },
                    }}
                >
                    <div className="flex items-center justify-between p-2">
                        <h1 className="text-4xl m-0 text-bold">Nova Busca</h1>
                        <IconButton onClick={handleSearchDrawerClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <HeroContainer />
                </Drawer>
                <div className="w-full bg-[#ddeeff] shadow-md">
                    {width < 768 ? (
                        <div className="px-2 py-2 flex flex-row justify-between">
                            <div className="flex flex-row items-center gap-1">
                                <h2 className="m-0 text-bold">
                                    {mockTravelResults[0].departure[0].departureAirportCode}
                                </h2>
                                <ExchangeIcon />
                                <h2 className="m-0 text-bold">
                                    {mockTravelResults[0].departure[0].arrivalAirportCode}
                                </h2>
                            </div>

                            {width > 400 && (
                                <div className="flex flex-row items-center">
                                    <h3 className="m-0 text-bold">{formatDate(mockTravelResults[0].departureDate)}</h3>
                                    {mockTravelResults[0].arrivalDate && (
                                        <h3 className="m-0 text-bold">
                                            -{formatDate(mockTravelResults[0].arrivalDate)}
                                        </h3>
                                    )}
                                </div>
                            )}

                            <Button
                                variant="outlined"
                                size="small"
                                className="!normal-case"
                                onClick={handleSearchDrawerOpen}
                            >
                                Nova Busca
                            </Button>
                        </div>
                    ) : (
                        <HeroContainer className="bg-[#ddeeff] flex flex-col rounded-2xl py-8 w-full gap-4 max-w-7xl mx-auto" />
                    )}
                </div>
            </>
        );
    };

    const ResultCard = (result: TravelResult) => (
        <div className="w-[70%] py-8 px-4 max-[1080px]:w-full">
            <div className="flex gap-2 flex-col">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        <h5 className="m-0 text-bold flex flex-row items-center">
                            <DeparturingAirplaneIcon size={28} className="mr-2" />
                            Ida
                        </h5>
                        -<span className="text-silver">{formatDate(result.departureDate)}</span>
                    </div>
                    {/* <p>
                <span className="text-bold mr-8">Bagagem</span>
            </p> */}
                </div>
                <Divider />
                <RadioGroup className="px-1 gap-3 max-md:w-full max-md:px-0 ">
                    {result.departure.map((departTravel) => (
                        <FormControlLabel
                            className="travel-item group/item selection::bg-slate-100 "
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
                                -<span className="text-silver">{formatDate(result.arrivalDate!)}</span>
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
    );

    const PriceBoxHeader = (result: TravelResult) => (
        <div className="price-box-header">
            <h1 className="text-bold text-2xl">R$ {result.price}</h1>
            <span className="text-silver">Por adulto e sem taxas</span>
        </div>
    );

    const PriceBox = (result: TravelResult, hasHeader: boolean = true) => (
        <div className="p-4 w-[30%] flex flex-col items-center gap-4 border-[0.2px] max-[1080px]:w-full">
            <div className="price-box-details">
                {hasHeader && PriceBoxHeader(result)}
                <p>
                    <span className="text-bold">Adulto: </span>
                    <span className="text-silver">R${result.price}</span>
                </p>
                <p>
                    <span className="text-bold">Taxa de embarque:</span>
                    <span className="text-silver">R${result.tax}</span>
                </p>
                <p>
                    <span className="text-bold">Impostos e encargos:</span>
                    <span className="text-silver">R${result.tax}</span>
                </p>
                <p>
                    <span className="text-bold">VALOR TOTAL:</span>
                    <span className="text-bold">R$ {result.price + result.tax}</span>
                </p>
            </div>
            <div className="purchase-btn w-full max-md:mt-4">
                <Button variant="contained" onClick={handlePlaceOrder}>
                    REALIZAR PEDIDO
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {window.location.pathname === "/search" ? (
                <div className="search">
                    {SearchHeader()}
                    <div className="search-body">
                        <SideBarFilter />
                        <div className="w-full max-md:w-full max-md:mt-4">
                            {width < 768 && (
                                <div className="flex flex-row justify-between items-center">
                                    <h3 className="text-bold m-0">Resultados da busca</h3>
                                    <Button
                                        size="large"
                                        className="flex flex-row gap-2 !pr-0"
                                        onClick={handleFilterDrawerOpen}
                                    >
                                        <FilterIcon /> Filtros
                                    </Button>
                                </div>
                            )}
                            <div className="flex flex-col gap-6">
                                {mockTravelResults.map((result) => {
                                    return (
                                        <div className="flex flex-row rounded shadow-md max-[1080px]:flex-col bg-white max-md:border max-md:border-black">
                                            <>
                                                {width < 1080 && PriceBoxHeader(result)}
                                                {ResultCard(result)}
                                                {PriceBox(result, width > 1080)}
                                            </>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
}
