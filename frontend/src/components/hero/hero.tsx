import { useRef, useState } from "react";
import "./hero.css";
//import { Form, ButtonGroup, ToggleButton, Button, InputGroup, Offcanvas } from "react-bootstrap";
import {
    Checkbox,
    FormGroup,
    FormControlLabel,
    Drawer,
    ButtonGroup,
    Button,
    RadioGroup,
    Radio,
    TextField,
} from "@mui/material";
import { IoIosPeople as PeopleIcon } from "react-icons/io";
import { GrClose as CloseIcon } from "react-icons/gr";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { RiSubtractFill as SubtractIcon } from "react-icons/ri";
import { FaExchangeAlt as ExchangeIcon } from "react-icons/fa";
import { IoIosAddCircle as AddCircleIcon, IoIosRemoveCircle as RemoveCircleIcon } from "react-icons/io";
import useWindowDimensions from "hooks/window-dimensions";
import Datetime from "react-datetime";
import { formatDate } from "utils/format-date";
import moment from "moment";
import "moment/locale/pt";
import { useNavigate } from "react-router-dom";
import { useOutsideClickAlerter } from "hooks/outside-click-alerter";
//import { Alert } from "components/alert/alert";
import heroBackground from "assets/images/hero.png";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

enum PassengerEnum {
    Adult,
    Child,
    Baby,
}

interface DatesPickerProps {
    travelMode: "one-way" | "round-trip";
}
interface Passenger {
    type: PassengerEnum;
    amount: number;
    description: string;
}

interface PassengersBoxProps {
    passengers: Passenger[];
    handlePassenger: (type: PassengerEnum, amount: number) => void;
    tooglePassengers: () => void;
    show: boolean;
    setShow: (show: boolean) => void;
    passengerTranslation: {
        0: string;
        1: string;
        2: string;
    };
}

interface PassengersContentProps {
    passengers: Passenger[];
    handlePassenger: (type: PassengerEnum, amount: number) => void;
    tooglePassengers: () => void;
    haveTitle: boolean;
    passengerTranslation: {
        0: string;
        1: string;
        2: string;
    };
}

interface TravelDates {
    begin: string;
    end?: string;
}

interface BeginDateTimeInputProps {
    handleDates: (dates: TravelDates) => void;
    dates: TravelDates;
    isBeginDateValid: (currentDate: any, selectedDate: any) => any;
    isOneWay?: boolean;
}

const PassengersContent = (props: PassengersContentProps) => {
    return (
        <>
            {props.haveTitle && (
                <div className="passengers-box-header">
                    <span>Passageiros</span>
                    <button className="passenger-box-close-btn" onClick={() => props.tooglePassengers()}>
                        <CloseIcon size={20} />
                    </button>
                </div>
            )}

            <div className="passengers-box-body">
                {props.passengers.map((passenger, idx) => (
                    <div className="passenger" key={idx}>
                        <h6>{props.passengerTranslation[passenger.type]}</h6>
                        <div className="passenger-options">
                            <span>{passenger.description}</span>
                            <div className="passenger-amount">
                                <button onClick={() => props.handlePassenger(passenger.type, passenger.amount - 1)}>
                                    <RemoveCircleIcon color="#134074" />
                                </button>
                                <span>{passenger.amount}</span>
                                <button onClick={() => props.handlePassenger(passenger.type, passenger.amount + 1)}>
                                    <AddCircleIcon color="#134074" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/*Class section*/}
            {props.haveTitle && (
                <>
                    <div className="passengers-box-header">
                        <span>Classe</span>
                    </div>
                </>
            )}
            <div className="passengers-box-body">
                <FormGroup>
                    <FormControlLabel className="class-option" control={<Checkbox />} label="Econômica" />
                    <FormControlLabel className="class-option" control={<Checkbox />} label="Executiva" />
                </FormGroup>
            </div>

            <br />

            {/*Button section*/}
            {!props.haveTitle && (
                <Button variant="contained" style={{ width: "100%" }} onClick={() => props.tooglePassengers()}>
                    Aplicar
                </Button>
            )}
        </>
    );
};

const PassangersBox = (props: PassengersBoxProps) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width > 812 ? (
                <div className="passengers-box">
                    <PassengersContent
                        passengers={props.passengers}
                        handlePassenger={props.handlePassenger}
                        tooglePassengers={props.tooglePassengers}
                        passengerTranslation={props.passengerTranslation}
                        haveTitle={true}
                    />
                </div>
            ) : (
                <Drawer open={props.show} onClose={() => props.setShow(false)} style={{ width: "90%" }}>
                    <div>
                        <h1>Passageiros e Classes</h1>
                    </div>

                    <div>
                        <PassengersContent
                            passengers={props.passengers}
                            handlePassenger={props.handlePassenger}
                            tooglePassengers={props.tooglePassengers}
                            passengerTranslation={props.passengerTranslation}
                            haveTitle={false}
                        />
                    </div>
                </Drawer>
            )}
        </>
    );
};

const BeginDateTimeInput = ({ dates, handleDates, isBeginDateValid, isOneWay }: BeginDateTimeInputProps) => (
    <Datetime
        className={isOneWay ? "" : "date-input-group-left"}
        value={dates.begin}
        dateFormat="DD/MM/YYYY"
        locale="pt-br"
        timeFormat={false}
        onChange={(value) => handleDates({ ...dates, begin: moment(value).format("DD/MM/YYYY") })}
        closeOnSelect
        isValidDate={isBeginDateValid}
    />
);

const DatesPicker = (props: DatesPickerProps) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width < 812 ? (
                <>
                    <MobileDatePicker label="Ida" />
                    <MobileDatePicker label="Volta" />
                </>
            ) : (
                <>
                    {
                        props.travelMode === "one-way" ? (
                            <DatePicker format="DD/MM/YYYY" label="Ida" />
                        ) : (
                            <ButtonGroup>
                                <DatePicker format="DD/MM/YYYY" sx={{ minWidth: 145}} className="date-input-group-left"  label="Ida" />
                                <DatePicker format="DD/MM/YYYY" sx={{ minWidth: 145}} className="date-input-group-right" label="Volta" />
                            </ButtonGroup>
                        )
                    }
                </>
            )}
        </>
    );
};

export default function Hero() {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    // states
    const [travelModeValue, setTravelModeValue] = useState<"one-way" | "round-trip">("round-trip");
    const [showPassengers, setShowPassengers] = useState(false);
    const [dates, setDates] = useState<TravelDates>({ begin: formatDate(new Date()), end: formatDate(new Date()) }); // [begin, end]
    const [passengers, setPassengers] = useState<Passenger[]>([
        { type: PassengerEnum.Adult, amount: 0, description: "acima de 12 anos" },
        { type: PassengerEnum.Child, amount: 0, description: "de 2 a 11 anos" },
        { type: PassengerEnum.Baby, amount: 0, description: "até 1 ano e 11 meses" },
    ]);

    // variables
    const passengerTranslation = {
        [PassengerEnum.Adult]: "Adultos",
        [PassengerEnum.Child]: "Crianças",
        [PassengerEnum.Baby]: "Bebês",
    };

    // functions
    const tooglePassengers = () => {
        setShowPassengers(!showPassengers);
    };

    const handleOutsideClick = () => {
        setShowPassengers(false);
    };

    const handlePassenger = (type: PassengerEnum, amount: number) => {
        const newPassengers = passengers.map((passenger) => {
            if (passenger.type === type) {
                return { ...passenger, amount };
            }
            return passenger;
        });
        setPassengers(newPassengers);
    };

    const handleDates = (dates: TravelDates) => {
        setDates(dates);
    };

    const isBeginDateValid = (currentDate: any, selectedDate: any) => {
        return currentDate.isAfter(moment().subtract(1, "days"));
    };

    const isEndDateValid = (currentDate: any, selectedDate: any) => {
        return currentDate.isAfter(moment(dates.begin, "DD/MM/YYYY"));
    };

    const handleSearch = () => {
        //Alert.info({ message: "Buscando voos..." });
        console.log("search");
        navigate("/search");
    };

    useOutsideClickAlerter(wrapperRef, handleOutsideClick);

    return (
        <div className="hero">
            {/* <video src={video} muted autoPlay loop typeof="video/mp4" ></video> */}
            <img src={heroBackground} className="background" alt="" />
            <div className="conteiner">
                <div className="search-box">
                    <div className="search-box-header">
                        <span>PASSAGENS AÉREAS</span>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select
                                value={travelModeValue}
                                onChange={(e) => setTravelModeValue(e.target.value as "one-way" | "round-trip")}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value={"one-way"}>Somente Ida</MenuItem>
                                <MenuItem value={"round-trip"}>Ida e Volta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="search-box-form">
                        <div className="locations">
                            <TextField className="search-box-form-input" label="Origem" variant="outlined" />
                            <div className="exchange-btn">
                                <ExchangeIcon size={20} color="#134074" />
                            </div>
                            <TextField className="search-box-form-input" label="Destino" variant="outlined" />
                        </div>

                        <DatesPicker travelMode={travelModeValue} />

                        <TextField
                            label="Passageiros"
                            defaultValue={`${passengers.length} ${
                                passengers.length > 1 ? "Passageiros" : "Passageiro"
                            }`}
                            onClick={() => tooglePassengers()}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="medium"
                            sx={{ minWidth: 140 }}
                        />

                        <Button className="search-btn" variant="contained" onClick={(evt) => handleSearch()} sx={{ height: "3.4rem", marginBottom: "0.1rem", minWidth: 160 }}>
                            BUSCAR VOOS
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
