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

        let trips: any[] = [];
            
        const tripsHandles = await page.$$(".select-flight-list-accordion-item");

        Logger.info(`tripsHandles: ${tripsHandles}`);
        
        let counter = 0;
        
        for (const tripHandle of tripsHandles) {
            await page.waitForSelector(".select-flight-list-accordion-item");
            Logger.info(`tripHandle: ${tripHandle}`);
            Logger.info(`counter: ${counter}`);
            const tripInfo = await page.evaluate(async (index) => {
                console.log("starting getting tripInfo")
                const smilesClubMilesCheckBox = document.querySelectorAll<HTMLInputElement>(".smiles_club input")[index];
                console.log(`checkbox: ${smilesClubMilesCheckBox}`);
                if (!smilesClubMilesCheckBox) {
                    console.log("smilesClubMilesCheckBox not found");
                    return;
                }
                console.log(`checkbox: ${smilesClubMilesCheckBox.checked}`);
                if (!smilesClubMilesCheckBox.checked) {
                    smilesClubMilesCheckBox.click();
                    console.log(`   checkbox after click: ${smilesClubMilesCheckBox.checked}`);
                }
                const confirmButton = document.querySelectorAll<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm")[index];
                if (!confirmButton) {
                    console.log("confirmButton not found");
                    return;
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
                    return;
                }
                const auxtrip = {
                    priceMiles,
                    tripTax,
                };
                console.log(`priceMiles: ${priceMiles}`);
                console.log(`tripTax: ${tripTax}`);

                return auxtrip;
            }, counter);

            if (!tripInfo || tripInfo === undefined || tripInfo === null) {
                Logger.info(`tripInfo: ${tripInfo}`);
                continue;
            }

            trips.push(tripInfo);

            await page.reload();
            counter++;
        }

        await browser.close();

        return trips;
    }
}
