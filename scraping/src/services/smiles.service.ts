import Logger from "../utils/logger";
import { Service } from "./service";

export class SmilesService extends Service {
    constructor() {
        super();
    }

    async search(): Promise<any> {
        Logger.info("Starting search...");

        const browser = await this.initBrowser();
        const page = await this.newPage(browser);

        await page.goto(
            "https://www.smiles.com.br/mfe/emissao-passagem/?adults=2&cabin=ALL&children=0&departureDate=1701313200000&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=1701615600000&searchType=g3&segments=1&tripType=1&originAirport=VCP&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=GYN&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true"
        );

        Logger.info("Waiting for cookies...")

        //const cookieAcceptButton = await page.waitForSelector("#onetrust-reject-all-handler", {visible: true});

        //await page.click("#onetrust-reject-all-handler");

        await page.waitForSelector(".select-flight-list-accordion-item", {visible: true, timeout: 10000});

        const trips = await page.evaluate(() => {
            // getting elements
            const subText = document.querySelector(".select-flight-header-info-content-subText")?.innerHTML;

            const itemsList: Element[] = Array.from(
                document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item")
            );
            
            console.log("itemsList: ", itemsList);

            const worstPrices = [];
            for (const item of itemsList) {
                const smilesClubMilesCheckBox = item.querySelector<HTMLInputElement>(".smiles_club input");
                console.log(smilesClubMilesCheckBox)

                if (smilesClubMilesCheckBox) {
                    smilesClubMilesCheckBox.click();
                }
                
                item.querySelector<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm")?.click();
            
                const priceMiles = item.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent;
                const tripTax = item.querySelector<HTMLDivElement>(".MONEY")?.childNodes[1].textContent

                const trip = {
                    priceMiles,
                    tripTax
                }

                worstPrices.push(trip);
            }

            return worstPrices;
        });

        Logger.info("page title is: ", trips);

        await browser.close();

        return trips;
    }
}
