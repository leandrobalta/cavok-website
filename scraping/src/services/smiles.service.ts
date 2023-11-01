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
            "https://www.smiles.com.br/mfe/emissao-passagem/?adults=1&cabin=ALL&children=0&departureDate=1704769200000&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=&searchType=congenere&segments=1&tripType=2&originAirport=HND&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=JFK&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true"
        );

        Logger.info("Waiting for cookies...");

        await page.waitForSelector(".select-flight-list-accordion-item");

        const trips = await page.evaluate(() => {
            const itemsList: Element[] = Array.from(document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item"));
            const auxTrips = [];

            for (const item of itemsList) {
                const smilesClubMilesCheckBox = item.querySelector<HTMLInputElement>(".smiles_club input");
                console.log(`checkbox: ${smilesClubMilesCheckBox}`);

                if (smilesClubMilesCheckBox) {
                    // Verifique se o checkbox não está marcado antes de clicar nele.
                    console.log(`checkbox: ${smilesClubMilesCheckBox.checked}`);
                    if (!smilesClubMilesCheckBox.checked) {
                        smilesClubMilesCheckBox.click();
                        console.log(`   checkbox after click: ${smilesClubMilesCheckBox.checked}`)
                    }
                }

                const confirmButton = item.querySelector<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm");

                if (confirmButton) {
                    confirmButton.click();
                }

                const priceMilesDiv = item.querySelector<HTMLDivElement>(".selected-flight-overview")

                if (priceMilesDiv) {
                    console.log(`priceMilesDiv: ${priceMilesDiv.textContent}`);
                }

                const priceMiles = item.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent;
                const tripTax = item.querySelector<HTMLDivElement>(".MONEY")?.childNodes[1].textContent;

                console.log(`priceMiles: ${priceMiles}`);
                console.log(`tripTax: ${tripTax}`);

                const trip = {
                    priceMiles,
                    tripTax,
                };

                auxTrips.push(trip);
            }

            return auxTrips;
        });

        Logger.info("page title is: ", trips);

        await browser.close();

        return trips;
    }
}
