import Hero from "components/hero/hero"
import Services from "components/services/services"
import "./home.css";
import Recommend from "pages/home/components/recommend/recommend";

export default function Home() {
    return (
        <div className="home">
            <Hero />
            <Recommend />
            <Services />
        </div>    
    )
}