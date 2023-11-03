import { JSHandle } from "puppeteer";
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

        // const tripsHandles = await page.evaluateHandle(() => document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item"));
        // const tripsDivs = await tripsHandles.getProperties();
        // const tripsDivsArray= tripsDivs.values();

        // Logger.info(`tripsDivsArray: ${tripsDivsArray}`);

        // // iterate over tripsDivs
        // for (const tripDiv of tripsDivsArray) {
        //     Logger.info(`tripDiv: ${tripDiv}`);
        //     const trip = tripDiv.asElement()

            // await page.evaluate(async (tripDiv) => {
            //     const smilesClubMilesCheckBox = tripDiv.querySelector<HTMLInputElement>(".smiles_club input");
            //     console.log(`checkbox: ${smilesClubMilesCheckBox}`);
            //     if (!smilesClubMilesCheckBox) {
            //         console.log("smilesClubMilesCheckBox not found");
            //         return;
            //     }
            //     console.log(`checkbox: ${smilesClubMilesCheckBox.checked}`);
            //     if (!smilesClubMilesCheckBox.checked) {
            //         smilesClubMilesCheckBox.click();
            //         console.log(`   checkbox after click: ${smilesClubMilesCheckBox.checked}`);
            //     }
            //     const confirmButton = tripDiv.querySelector<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm");
            //     if (!confirmButton) {
            //         console.log("confirmButton not found");
            //         return;
            //     }
            //     console.log("confirmButton found");
            //     confirmButton.click();
            //     await new Promise(function (resolve) {
            //         setTimeout(resolve, 3000);
            //     });
            //     const priceMiles = document.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent;
            //     const tripTax = document.querySelector<HTMLDivElement>(".MONEY")?.childNodes[1].textContent;
            //     if (!priceMiles || !tripTax) {
            //         console.log("priceMiles or tripTax not found");
            //         return;
            //     }
            //     const trip = {
            //         priceMiles,
            //         tripTax,
            //     };
            //     console.log(`priceMiles: ${priceMiles}`);
            //     console.log(`tripTax: ${tripTax}`);

            //     return trip;
            // }, tripDiv.asElement());
        //}

        const trips = await page.evaluate(async () => {
            const itemsList: Element[] = Array.from(document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item"));
            const auxTrips = [];
            for (const item of itemsList) {
                const smilesClubMilesCheckBox = item.querySelector<HTMLInputElement>(".smiles_club input");
                console.log(`checkbox: ${smilesClubMilesCheckBox}`);
                if (!smilesClubMilesCheckBox) {
                    console.log("smilesClubMilesCheckBox not found");
                    continue;
                }
                console.log(`checkbox: ${smilesClubMilesCheckBox.checked}`);
                if (!smilesClubMilesCheckBox.checked) {
                    smilesClubMilesCheckBox.click();
                    console.log(`   checkbox after click: ${smilesClubMilesCheckBox.checked}`);
                }
                const confirmButton = item.querySelector<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm");
                if (!confirmButton) {
                    console.log("confirmButton not found");
                    continue;
                }
                console.log("confirmButton found");
                confirmButton.click();
                await new Promise(function (resolve) {
                    setTimeout(resolve, 3000);
                });
                const priceMiles = document.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent;
                const tripTax = document.querySelector<HTMLDivElement>(".MONEY")?.childNodes[1].textContent;
                if (!priceMiles || !tripTax) {
                    console.log("priceMiles or tripTax not found");
                    continue;
                }
                const trip = {
                    priceMiles,
                    tripTax,
                };
                console.log(`priceMiles: ${priceMiles}`);
                console.log(`tripTax: ${tripTax}`);
                auxTrips.push(trip);

                document.querySelector<HTMLDivElement>(".search ")?.click();
            }
            return auxTrips;
        });
        

        await browser.close();

        return trips;
    }
}
