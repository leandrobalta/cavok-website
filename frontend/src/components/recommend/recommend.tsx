import React from 'react';
import { CavokButton } from 'components/cavok-colored';
import "./recommend.css";
import { Card } from 'react-bootstrap';

export default function Recommend() {
    const Destination1 = require("assets/images/Destination1.png");
    const Destination2 = require("assets/images/Destination2.png");
    const Destination3 = require("assets/images/Destination3.png");
    const Destination4 = require("assets/images/Destination4.png");
    const Destination5 = require("assets/images/Destination5.png");
    const Destination6 = require("assets/images/Destination6.png");

    const destinations = [
        {
            image: Destination1,
            title: "Singapore",
            subTitle: "Singapore, officialy thr Republic of Singapore, is a",
            cost: "38,800",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination2,
            title: "Thailand",
            subTitle: "Thailand is a Southeast Asia country. It's known for",
            cost: "54,200",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination3,
            title: "Paris",
            subTitle: "Paris, France's capital, is a major European city and a",
            cost: "45,500",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination4,
            title: "New Zealand",
            subTitle: "New Zealand is an island country in the",
            cost: "24,100",
            duration: "Approx 1 night trip",
        },
        {
            image: Destination5,
            title: "Bora Bora",
            subTitle: "Bora Bora is a small South Pacific island northwest of",
            cost: "95,400",
            duration: "Approx 2 night 2 day trip",
        },
        {
            image: Destination6,
            title: "London",
            subTitle: "London, the capital of England and the United",
            cost: "38,800",
            duration: "Approx 3 night 2 day trip",
        },
    ];

    return (
        <>
            <h3>Recomendações</h3>
            <div className="recommend">
                {
                    destinations.map((destination, index) => (
                        <Card className="recommend-card">
                            <Card.Img variant="top" src={destination.image} />
                            <Card.Body>
                                <Card.Title>{destination.title}</Card.Title>
                                <Card.Text>{destination.subTitle}</Card.Text>
                                <Card.Text>
                                    <span className="cost">₹ {destination.cost}</span>
                                    <span className="duration">{destination.duration}</span>
                                </Card.Text>
                                <CavokButton>Book Now</CavokButton>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
