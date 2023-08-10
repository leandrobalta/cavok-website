import { useState } from "react";
import "./hero.css";
import { Form, ButtonGroup, ToggleButton, Button, InputGroup } from "react-bootstrap";
import { CavokToggleButton, CavokButton } from "components/cavok-colored";
import { IoIosPeople as PeopleIcon } from "react-icons/io";
import { GrClose as CloseIcon } from "react-icons/gr";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { RiSubtractFill as SubtractIcon } from "react-icons/ri";

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

export default function Hero() {
    // states
    const [travelModeValue, setTravelModeValue] = useState("round-trip");
    const [passengers, setPassengers] = useState<Passenger[]>([
        { type: PassengerEnum.Adult, amount: 0, description: "acima de 12 anos" },
        { type: PassengerEnum.Child, amount: 0, description: "de 2 a 11 anos" },
        { type: PassengerEnum.Baby, amount: 0, description: "até 1 ano e 11 meses" },
    ]);
    const [showPassengers, setShowPassengers] = useState(false);

    const passengerTranslation = {
        [PassengerEnum.Adult]: "Adultos",
        [PassengerEnum.Child]: "Crianças",
        [PassengerEnum.Baby]: "Bebês",
    };

    // variables
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
                    <div className="row">
                        <Form.Group className="location-input">
                            <Form.Label>Origem</Form.Label>
                            <Form.Control className="hero-input" type="text" placeholder="Digite a cidade de origem" />
                        </Form.Group>
                        <Form.Group className="location-input">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control type="text" placeholder="Digite a cidade de origem" />
                        </Form.Group>

                        <Form.Group className="location-input">
                            {travelModeValue === "one-way" ? (
                                <>
                                    <Form.Label>Data de ida</Form.Label>
                                    <Form.Control type="date" placeholder="Digite a cidade de origem" />
                                </>
                            ) : (
                                <>
                                    <Form.Label>Datas</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" placeholder="Digite a cidade de origem" />
                                        <Form.Control type="date" placeholder="Digite a cidade de origem" />
                                    </InputGroup>
                                </>
                            )}
                        </Form.Group>

                        <Form.Group className="location-input">
                            <Form.Label>Passageiros</Form.Label>
                            <Form.Control className="passengers-input" as="button" onClick={() => tooglePassengers()}>
                                <PeopleIcon size={25} />1 Passageiro
                            </Form.Control>
                            {showPassengers && (
                                <div className="passengers-box">
                                    <div className="passengers-box-header">
                                        <span>Passageiros</span>
                                        <button className="passenger-box-close-btn" onClick={() => tooglePassengers()}>
                                            <CloseIcon size={20} />
                                        </button>
                                    </div>
                                    <div className="passengers-box-body">
                                        {passengers.map((passenger, idx) => (
                                            <div className="passenger" key={idx}>
                                                <h6>{passengerTranslation[passenger.type]}</h6>
                                                <div className="passenger-options">
                                                    <span>{passenger.description}</span>
                                                    <div className="passenger-amount">
                                                        <CavokButton
                                                            style={{ borderRadius: "45%" }}
                                                            onClick={() =>
                                                                handlePassenger(passenger.type, passenger.amount - 1)
                                                            }
                                                        >
                                                            <SubtractIcon />
                                                        </CavokButton>
                                                        <span>{passenger.amount}</span>
                                                        <CavokButton
                                                            style={{ borderRadius: "45%" }}
                                                            onClick={() =>
                                                                handlePassenger(passenger.type, passenger.amount + 1)
                                                            }
                                                        >
                                                            <PlusIcon />
                                                        </CavokButton>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/*Class section*/}
                                    <div className="passengers-box-header">
                                        <span>Classe</span>
                                    </div>
                                    <div className="passengers-box-body">
                                        <Form.Check // prettier-ignore
                                            type="radio"
                                            id={`eco`}
                                            label="Econômica"
                                        />

                                        <Form.Check
                                            type="radio"
                                            label="Executiva"
                                            id="executive"
                                        />
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                        <CavokButton className="search-btn">BUSCAR VOOS</CavokButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
