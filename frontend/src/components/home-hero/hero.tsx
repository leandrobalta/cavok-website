import { useState } from "react";
import "./hero.css";
import { Form, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import styled from "styled-components";

const ToggleButtonStyled = styled(ToggleButton)<{$checked?: boolean}>`
    border: 1px solid #134074;
    color: #fff;
    color: ${props => props.$checked ? "#fff" : "#134074"};
    background-color: ${props => props.$checked ? "#134074" : "#fff"};
    &:hover {
        background-color: ${props => props.$checked ? "#134074" : "#fff"};
        color: ${props => props.$checked ? "#fff" : "#134074"};
    }

`

const SearchButton = styled(Button)`
    background-color: #134074;
    color: #fff;
    border: 1px solid #134074;
    &:hover {
        background-color: #134085;
        border: 1px solid #134085;
    }
`

export default function Hero() {
    const [travelModeValue, setTravelModeValue] = useState("round-trip");

    const travelMode = [
        { name: "Ida e volta", value: "round-trip" },
        { name: "Somente ida", value: "one-way" },
    ];

    return (
        <div className="hero">
            {/* <video src={video} muted autoPlay loop typeof="video/mp4" ></video> */}
            <div className="conteiner">
                <div className="row">
                    <h3>PASSAGENS AÉREAS</h3>
                    <ButtonGroup >
                        {travelMode.map((travelMode, idx) => (
                            <ToggleButtonStyled
                                $checked={travelModeValue === travelMode.value}
                                // style={{ border: "1px solid #134074", color: "#fff", backgroundColor: "#134074" }}
                                key={idx}
                                color="#134074"
                                id={`radio-${idx}`}
                                type="radio"
                                // variant="outline-primary"
                                name="radio"
                                value={travelMode.value}
                                checked={travelModeValue === travelMode.value}
                                onChange={(e) => setTravelModeValue(e.currentTarget.value)}
                            >
                                {travelMode.name}
                            </ToggleButtonStyled>
                            
                        ))}
                    </ButtonGroup>
                    <p></p>
                    <p></p>
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
                    <SearchButton id="search-btn">
                        BUSCAR VOOS
                    </SearchButton>
                </div>
            </div>
        </div>
    );
}
