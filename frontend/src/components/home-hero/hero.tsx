import { useState } from "react";
import "./hero.css";
import { Form, ButtonGroup, ToggleButton, Button } from "react-bootstrap";

export default function Hero() {
    const [travelModeValue, setTravelModeValue] = useState("round-trip");

    const travelMode = [
        { name: "Ida e volta", value: "round-trip" },
        { name: "Somente ida", value: "one-way" },
    ];

    return (
        <div className="hero">
            {/* <video src={video} muted autoPlay loop typeof="video/mp4" ></video> */}
            {/* <img src={logo} className="background" alt="" /> */}
            <div className="conteiner">
                <div className="row">
                    <h3>PASSAGENS AÉREAS</h3>
                    <ButtonGroup>
                        {travelMode.map((travelMode, idx) => (
                            <ToggleButton
                                //style={{ border: "1px solid #134074", color: "#fff", backgroundColor: "#134074" }}
                                className={travelModeValue === travelMode.value ? "btn-travel-mode-active" : "btn-travel-mode"}
                                key={idx}
                                color="#134074"
                                id={`radio-${idx}`}
                                type="radio"
                                variant="outline-primary"
                                name="radio"
                                value={travelMode.value}
                                checked={travelModeValue === travelMode.value}
                                onChange={(e) => setTravelModeValue(e.currentTarget.value)}
                            >
                                {travelMode.name}
                            </ToggleButton>
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
                    <Button id="search-btn">BUSCAR VOOS</Button>
                </div>
            </div>
        </div>
    );
}
