import { useState } from "react";
import "./hero.css";
import { Form, ButtonGroup, ToggleButton, Button, InputGroup, Offcanvas } from "react-bootstrap";
import { CavokToggleButton, CavokButton } from "components/cavok-colored";
import { IoIosPeople as PeopleIcon } from "react-icons/io";
import { GrClose as CloseIcon } from "react-icons/gr";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { RiSubtractFill as SubtractIcon } from "react-icons/ri";
import { FaExchangeAlt as ExchangeIcon } from "react-icons/fa";
import { IoIosAddCircle as AddCircleIcon, IoIosRemoveCircle as RemoveCircleIcon } from "react-icons/io";
import useWindowDimensions from "hooks/window-dimensions";
import Datetime from "react-datetime";
import { formatDate } from "utils/format-date";

enum PassengerEnum {
    Adult,
    Child,
    Baby,
}

interface TravelMode {
    name: string;
    value: "round-trip" | "one-way";
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
                <Form.Check type="radio" label="Econômica" id="eco" name="class-option" className="class-option" />

                <Form.Check
                    type="radio"
                    label="Executiva"
                    id="executive"
                    name="class-option"
                    className="class-option"
                />
            </div>

            <br />

            {/*Button section*/}
            {!props.haveTitle && (
                <CavokButton style={{ width: "100%" }} onClick={() => props.tooglePassengers()}>
                    APLICAR
                </CavokButton>
            )}
        </>
    );
};

const PassangersBox = (props: PassengersBoxProps) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width > 768 ? (
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
                <Offcanvas show={props.show} onHide={() => props.setShow(false)} style={{ width: "90%" }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Passageiros e Classes</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <PassengersContent
                            passengers={props.passengers}
                            handlePassenger={props.handlePassenger}
                            tooglePassengers={props.tooglePassengers}
                            passengerTranslation={props.passengerTranslation}
                            haveTitle={false}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
};

export default function Hero() {
    // states
    const [travelModeValue, setTravelModeValue] = useState("round-trip");
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

    const travelMode = [
        { name: "Ida e volta", value: "round-trip" },
        { name: "Somente ida", value: "one-way" },
    ];
    const heroBackground = require("assets/images/hero.png");

    // functions
    const tooglePassengers = () => {
        setShowPassengers(!showPassengers);
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

    return (
        <div className="hero">
            {/* <video src={video} muted autoPlay loop typeof="video/mp4" ></video> */}
            <img src={heroBackground} className="background" alt="" />
            <div className="conteiner">
                <div className="search-box">
                    <div className="search-box-header">
                        <span>PASSAGENS AÉREAS</span>
                        <ButtonGroup>
                            {travelMode.map((travelMode, idx) => (
                                <CavokToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    value={travelMode.value}
                                    checked={travelModeValue === travelMode.value}
                                    onChange={(e) => setTravelModeValue(e.currentTarget.value)}
                                >
                                    {travelMode.name}
                                </CavokToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                    <div className="search-box-form">
                        <div className="locations">
                            <Form.Group className="search-box-form-input">
                                <Form.Label>Origem</Form.Label>
                                <Form.Control type="text" placeholder="Digite a cidade de origem" />
                            </Form.Group>

                            <ExchangeIcon className="exchange-icon" />

                            <Form.Group className="search-box-form-input">
                                <Form.Label>Destino</Form.Label>
                                <Form.Control type="text" placeholder="Digite a cidade de origem" />
                            </Form.Group>
                        </div>

                        <Form.Group className="search-box-form-input date-input">
                            {travelModeValue === "one-way" ? (
                                <>
                                    <Form.Label>Data de ida</Form.Label>
                                    <Datetime
                                        value={dates.begin}
                                        dateFormat="DD/MM/YYYY"
                                        locale="pt"
                                        timeFormat={false}
                                        onChange={(value) => console.log("value is : ", value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <Form.Label>Datas</Form.Label>
                                    <div className="date-input-group inline-flex">
                                        <Datetime
                                            className="date-input-group-left"
                                            value={dates.begin}
                                            dateFormat="DD/MM/YYYY"
                                            locale="pt"
                                            timeFormat={false}
                                            onChange={(value) => console.log("value is : ", value)}
                                        />
                                        <Datetime
                                            className="date-input-group-right"
                                            value={dates.end}
                                            dateFormat="DD/MM/YYYY"
                                            locale="pt"
                                            timeFormat={false}
                                            onChange={(value) => console.log("value is : ", value)}
                                        />
                                    </div>
                                </>
                            )}
                        </Form.Group>

                        <Form.Group className="search-box-form-input">
                            <Form.Label>Passageiros</Form.Label>
                            <Form.Control className="passengers-input" as="button" onClick={() => tooglePassengers()}>
                                <PeopleIcon size={25} />
                                <span>
                                    {passengers.length} {passengers.length > 1 ? "Passageiros" : "Passageiro"}
                                </span>
                            </Form.Control>
                            {showPassengers && (
                                <PassangersBox
                                    passengers={passengers}
                                    handlePassenger={handlePassenger}
                                    tooglePassengers={tooglePassengers}
                                    show={showPassengers}
                                    setShow={setShowPassengers}
                                    passengerTranslation={passengerTranslation}
                                />
                            )}
                        </Form.Group>
                        <CavokButton className="search-btn">BUSCAR VOOS</CavokButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
