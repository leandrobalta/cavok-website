import Hero from "components/hero/hero"
import Services from "components/services/services"
import "./home.css";

export default function Home() {
    return (
        <div className="home">
            <Hero />
            <Services />
        </div>    
    )
}