import { JSHandle } from "puppeteer";
import Logger from "../utils/logger";
import { Service } from "./service";
import { Travel } from "../models/Travel";
import { dateToTimestamp } from "../utils/date-to-timestamp";

export class SmilesService extends Service {
    constructor() {
        super();
    }

    async search(travel: Travel): Promise<any> {
        Logger.info("Starting search...");

        const browser = await this.initBrowser();
        const page = await this.newPage(browser);

        const searchType = travel.searchType === "national" ? "g3" : "congere";
        const departureDate = dateToTimestamp(travel.departureDate);
        const returnDate = travel.returnDate ? dateToTimestamp(travel.returnDate) : "";
        // await page.goto(
        //     `https://www.smiles.com.br/mfe/emissao-passagem/?adults=1&cabin=ALL&children=0&departureDate=1704769200000&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=&searchType=congenere&segments=1&tripType=2&originAirport=HND&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=JFK&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true`
        // );
        // create page based on travel parameter
        await page.goto(
            `https://www.smiles.com.br/mfe/emissao-passagem/?adults=${travel.adults}&cabin=${travel.cabin}&children=${travel.children}&departureDate=${departureDate}&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=${returnDate}&searchType=${searchType}&segments=1&tripType=2&originAirport=${travel.originAirport}&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=${travel.destinationAirport}&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true`   
        );

        Logger.info("Waiting for cookies...");

        await page.waitForSelector(".select-flight-list-accordion-item");

        let trips: any[] = [];

        const tripsHandles = await page.$$(".select-flight-list-accordion-item");

        Logger.info(`tripsHandles: ${tripsHandles}`);

        for (let i = 0; i < tripsHandles.length; i++) {
            if (i > 1) break;
            await page.waitForSelector(".select-flight-list-accordion-item");
            const tripInfo = await page.evaluate(async (index) => {
                async function waitForElement(selector: string) {
                    return new Promise<void>((resolve) => {
                        // Adicionei o tipo 'void' para a Promise
                        const observer = new MutationObserver((mutationsList) => {
                            for (const mutation of mutationsList) {
                                if (document.querySelector(selector)) {
                                    observer.disconnect();
                                    resolve();
                                }
                            }
                        });

                        const targetNode = document.body;
                        const config = { childList: true, subtree: true };
                        observer.observe(targetNode, config);
                    });
                }

                const smilesClubMilesCheckBox = document.querySelectorAll<HTMLInputElement>(".smiles_club input")[index];

                if (!smilesClubMilesCheckBox) return;

                if (!smilesClubMilesCheckBox.checked) smilesClubMilesCheckBox.click();

                const confirmButton = document.querySelectorAll<HTMLButtonElement>(".select-flight-list-accordion-item-button-confirm")[index];
                if (!confirmButton) return;

                confirmButton.click();
                await waitForElement(".selected-flight-overview");

                // getting infos
                const priceMiles = Number(
                    document.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent?.split(" ")[0].replace(".", "")
                );
                const tripTax = parseFloat(
                    document.querySelector<HTMLDivElement>(".MONEY")?.childNodes[1].textContent?.split(" ")[1].replace(".", "").replace(",", ".")!
                );

                console.log(`priceMiles: ${priceMiles}`);
                console.log(`tripTax: ${tripTax}`);

                const company = document.querySelector<HTMLSpanElement>("span.company")?.textContent;
                console.log(`company: ${company}`);

                const seat = document.querySelector<HTMLSpanElement>("span.seat")?.textContent;
                console.log(`seat: ${seat}`);

                const stopsSplited = document.querySelector<HTMLParagraphElement>("scale-duration__type-flight")?.textContent?.split(" ");

                let stops: number;
                if (stopsSplited?.length === 2) {
                    stops = Number(stopsSplited[0]);
                } else {
                    stops = 0;
                }
                console.log(`stops: ${stops}`);

                const durationTimeSplited = document.querySelector<HTMLParagraphElement>(".scale-duration__time")?.textContent?.split("h");
                console.log(`duration without split: ${document.querySelector<HTMLParagraphElement>(".scale-duration__time")?.textContent}`);

                const durationMin = durationTimeSplited![1].split("m")[0];
                const duration = Number(durationTimeSplited![0]) * 60 + Number(durationMin);
                console.log(`duration: ${duration}`);

                const departureTime = document.querySelectorAll(".info strong")[0].textContent?.replace("h", ":");
                console.log(`departureTime: ${departureTime}`);

                const arrivalTime = document.querySelectorAll(".info strong")[1].textContent?.replace("h", ":");
                console.log(`arrivalTime: ${arrivalTime}`);

                const bagCount = Number(document.querySelectorAll(".scale-duration__bag-total")[0].textContent) || 0;
                console.log(`bagCount: ${bagCount}`);

                const suitcaseCount = Number(document.querySelectorAll(".scale-duration__bag-total")[1].textContent) || 0;
                console.log(`suitcaseCount: ${suitcaseCount}`);

                //getting trip number
                const moreInformationButton = document.querySelector<HTMLButtonElement>(".scale-duration__more-information");
                if (moreInformationButton) {
                    console.log("moreInformationButton founded");
                    moreInformationButton.click();
                    await waitForElement(".company-text-content .class")
                }

                let tripNumberSpanArr = Array.from(document.querySelectorAll<HTMLSpanElement>(".company-text-content .class"));
                console.log(`tripNumberSpanArr: ${tripNumberSpanArr.length}`);
                let tripNumberArr: string[] = [];

                for (let i = 0; i < tripNumberSpanArr.length; i++) {
                    const tripNumber = tripNumberSpanArr[i].textContent?.split(" ")[1];
                    console.log(`tripNumber: ${tripNumber}`);
                    if (tripNumber) {
                        tripNumberArr.push(tripNumber);
                    }
                }
                document.querySelector<HTMLButtonElement>("#btn-close-modal-MORE_DETAILS")?.click();

                const auxtrip = {
                    priceMiles,
                    tripTax,
                    company,
                    seat,
                    stops,
                    duration,
                    departureTime,
                    arrivalTime,
                    bagCount,
                    suitcaseCount,
                    tripNumberArr,
                };

                return auxtrip;
            }, i);

            if (!tripInfo || tripInfo === undefined || tripInfo === null) {
                Logger.info(`tripInfo: ${tripInfo}`);
                continue;
            }

            trips.push(tripInfo);

            await page.reload();
        }

        await browser.close();

        return trips;
    }
}
