import React from "react";
import "./recommend.css";
import { HorizontalLine } from "components/cavok-colored";
import Destination1 from "assets/images/Destination1.png";
import Destination2 from "assets/images/Destination2.png";
import Destination3 from "assets/images/Destination3.png";
import Destination4 from "assets/images/Destination4.png";
import Destination5 from "assets/images/Destination5.png";
import Destination6 from "assets/images/Destination6.png";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function Recommend() {
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
        <div className="recommend">
            <div className="recommend-title">
                <h3>Recomendações</h3>
                <HorizontalLine />
            </div>
            <div className="recommend-body">
                {destinations.map((destination, index) => (
                    // <Card className="recommend-card">
                    //     <Card.Img variant="top" src={destination.image} />
                    //     <Card.Body>
                    //         <Card.Title>{destination.title}</Card.Title>
                    //         <Card.Text>{destination.subTitle}</Card.Text>
                    //         <Card.Text>
                    //             <span className="cost">₹ {destination.cost}</span>
                    //             <span className="duration">{destination.duration}</span>
                    //         </Card.Text>
                    //         <CavokButton>Book Now</CavokButton>
                    //     </Card.Body>
                    // </Card>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={(e) => alert("not implemented yet")}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={destination.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {destination.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {destination.subTitle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {destination.duration}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {destination.cost}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    );
}
