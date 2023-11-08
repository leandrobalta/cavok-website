import { JSHandle } from "puppeteer";
import Logger from "../utils/logger";
import { Service } from "./service";
import { Connection, SearchTravelRequest, Travel } from "../models/SearchTravel";
import { dateToTimestamp } from "../utils/date-to-timestamp";

export class SmilesService extends Service {
    constructor() {
        super();
    }

    async search(travel: SearchTravelRequest): Promise<Travel[]> {
        Logger.info("Starting search...");

        const browser = await this.initBrowser();
        const page = await this.newPage(browser);

        const searchType = travel.searchType === "national" ? "g3" : "congere";
        const departureDate = dateToTimestamp(travel.departureDate);
        const returnDate = "";
        
        // create page based on travel parameter
        await page.goto(
            `https://www.smiles.com.br/mfe/emissao-passagem/?adults=${travel.adults}&cabin=${travel.cabin}&children=${travel.children}&departureDate=${departureDate}&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=${returnDate}&searchType=${searchType}&segments=1&tripType=2&originAirport=${travel.originAirport}&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=${travel.destinationAirport}&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true`
        );

        Logger.info("Waiting for cookies...");

        await page.waitForSelector(".select-flight-list-accordion-item");

        let trips: Travel[] = [];

        const tripsHandles = await page.$$(".select-flight-list-accordion-item");

        Logger.info(`tripsHandles: ${tripsHandles}`);

        for (let i = 0; i < tripsHandles.length; i++) {
            if (i > 1) break;
            await page.waitForSelector(".select-flight-list-accordion-item");
            const tripInfo = await page.evaluate(async (index) => {
                async function waitForElement(selector: string) {
                    return new Promise<void>((resolve) => {
                        console.log(`waiting for ${selector}`)
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
                await waitForElement(".MONEY");

                // getting infos
                const milesPrice = Number(
                    document.querySelector<HTMLDivElement>(".selected-flight-overview")?.childNodes[2].textContent?.split(" ")[0].replace(".", "")
                );
                console.log(`priceMiles: ${milesPrice}`);
                

                const stringFees = document.querySelector<HTMLDivElement>(".MONEY")?.textContent?.split(" ")[1].replace(".", "").replace(",", "."); 
                console.log(`stringFees: ${stringFees}`);

                const fees = parseFloat(stringFees!);
                console.log(`fees: ${fees}`);

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

                //open more details modal
                const moreInformationButton = document.querySelector<HTMLButtonElement>(".scale-duration__more-information");
                if (moreInformationButton) {
                    console.log("moreInformationButton founded");
                    moreInformationButton.click();
                    await waitForElement(".flight");
                }

                const flightDetailsDivs = Array.from(document.querySelectorAll<HTMLDivElement>(".flight"));

                if (!flightDetailsDivs) {
                    console.log("flightDetailsDivs not founded");
                    return;
                };

                console.log(`flightDetailsDivs: ${flightDetailsDivs}`)

                

                if (flightDetailsDivs.length !== (stops + 1)) {
                    console.log("flightDetailsDivs.length !== (stops + 1)")
                    console.log(`flightDetailsDivs.length: ${flightDetailsDivs.length}`);
                    console.log(`stops: ${stops}`);
                    stops = flightDetailsDivs.length - 1;
                }

                console.log(`flightDetailsDivs.length: ${flightDetailsDivs.length}`);

                let connections: Connection[] = [];

                for (let i = 0; i < flightDetailsDivs.length; i++) {
                    const flightDetailsDiv = flightDetailsDivs[i];

                    const itineraryDataDivs = Array.from(flightDetailsDiv.querySelectorAll<HTMLDivElement>(".itinerary-data"));

                    if (!itineraryDataDivs) return;

                    const originAirport = itineraryDataDivs[0].querySelector<HTMLDivElement>(".airport-place .airport-code")?.textContent;
                    console.log(`originAirport: ${originAirport}`);
                    const destinationAirport = itineraryDataDivs[1].querySelector<HTMLDivElement>(".airport-place .airport-code")?.textContent;
                    console.log(`destinationAirport: ${destinationAirport}`);

                    const originCity = itineraryDataDivs[0].querySelector<HTMLDivElement>(".airport-place")?.textContent?.split(originAirport!)[1].trim();
                    console.log(`originCity: ${originCity}`);
                    const destinationCity = itineraryDataDivs[1].querySelector<HTMLDivElement>(".airport-place")?.textContent?.split(destinationAirport!)[1].trim();
                    console.log(`destinationCity: ${destinationCity}`);

                    const departureAllDate = itineraryDataDivs[0].querySelector<HTMLDivElement>(".date")?.textContent;
                    const arrivalAllDate = itineraryDataDivs[1].querySelector<HTMLDivElement>(".date")?.textContent;

                    const departureDate = departureAllDate?.split("-")[1].split(",")[1].trim();
                    console.log(`departureDate: ${departureDate}`);

                    const arrivalDate = arrivalAllDate?.split("-")[1].split(",")[1].trim();
                    console.log(`arrivalDate: ${arrivalDate}`);

                    const departureTime = departureAllDate?.split("-")[0].replace("h", ":").trim();
                    console.log(`departureTime: ${departureTime}`);

                    const arrivalTime = arrivalAllDate?.split("-")[0].replace("h", ":").trim(); 
                    console.log(`arrivalTime: ${arrivalTime}`);

                    const durationTimeWithoutSplit = flightDetailsDiv.querySelector<HTMLSpanElement>(".time-content")?.textContent?.split(":")[1].trim();
                    const durationTimeSplited = durationTimeWithoutSplit?.split("h");
                    console.log(`duration without split: ${flightDetailsDiv.querySelector<HTMLSpanElement>(".duration")?.textContent}`);

                    const durationMin = durationTimeSplited![1].split("m")[0];
                    const duration = Number(durationTimeSplited![0]) * 60 + Number(durationMin);
                    console.log(`duration: ${duration}`);

                    const company = flightDetailsDiv.querySelector<HTMLSpanElement>(".company-name")?.textContent;
                    console.log(`company: ${company}`);

                    const seat = flightDetailsDiv.querySelector<HTMLSpanElement>(".class")?.textContent?.split(" ")[3];
                    console.log(`seat: ${seat}`);

                    const tripNumber = flightDetailsDiv.querySelector<HTMLSpanElement>(".class")?.textContent?.split(" ")[1];
                    console.log(`tripNumber: ${tripNumber}`);

                    const connection: Connection = {
                        originAirport: originAirport!,
                        destinationAirport: destinationAirport!,
                        originCity: originCity!,
                        destinationCity: destinationCity!,
                        departureTime: departureTime!,
                        departureDate: departureDate!,
                        arrivalTime: arrivalTime!,
                        arrivalDate: arrivalDate!,
                        duration: duration,
                        company: company!,
                        seat: seat!,
                        tripNumber: tripNumber!
                    };

                    connections.push(connection);
                }
                document.querySelector<HTMLButtonElement>("#btn-close-modal-MORE_DETAILS")?.click();

                const auxtrip: Travel = {
                    milesPrice,
                    fees,
                    company: company!,
                    seat: seat!,
                    stops,
                    duration,
                    departureTime: departureTime!,
                    arrivalTime: arrivalTime!,
                    bagCount,
                    suitcaseCount,
                    tripNumber: connections[0].tripNumber,
                    arrivalDate: connections[connections.length - 1].arrivalDate,
                    departureDate: connections[0].departureDate,
                    connections
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
