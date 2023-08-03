import { useState } from "react";
import "./hero.css";
import { Form, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { CavokToggleButton, CavokButton } from "components/cavok-colored";
const heroBackground = require("assets/images/hero.png");

export default function Hero() {
    const [travelModeValue, setTravelModeValue] = useState("round-trip");

    const travelMode = [
        { name: "Ida e volta", value: "round-trip" },
        { name: "Somente ida", value: "one-way" },
    ];

    return (
        <div className="hero">
            {/* <video src={video} muted autoPlay loop typeof="video/mp4" ></video> */}
            <img src={heroBackground} className="background" alt="" /> 
            <div className="conteiner">
                <div className="search-box">
                    <div className="row">
                        <h3>PASSAGENS AÉREAS</h3>
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
                    <br />
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
                            <Form.Label>Data de ida</Form.Label>
                            <Form.Control type="date" placeholder="Digite a cidade de origem" />
                        </Form.Group>
                        <CavokButton style={{ marginTop: "auto" }}>BUSCAR VOOS</CavokButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
