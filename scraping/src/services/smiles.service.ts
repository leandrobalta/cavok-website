import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PuppeteerExtraPluginAdblocker } from "puppeteer-extra-plugin-adblocker";
import { Service } from "./service";

export class SmilesService extends Service {
  constructor() {
    super();
  }

  async search(): Promise<any> {
    const browser = await this.initBrowser();
    const page = await this.newPage(browser);

    await page.goto(
      "https://www.smiles.com.br/mfe/emissao-passagem/?adults=2&cabin=ALL&children=0&departureDate=1701313200000&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=1701615600000&searchType=g3&segments=1&tripType=1&originAirport=VCP&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=GYN&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true"
    );
    //   const cookieAcceptButton = await page.$("#onetrust-reject-all-handler");
    //   if (cookieAcceptButton) {
    //     await cookieAcceptButton.click();
    //   } else {
    //     console.log("O botão de aceitar cookies não foi encontrado.");
    //   }

    await page.click("#onetrust-reject-all-handler");

    const prices = await page.evaluate(() => {
      // getting elements
      const subText = document.querySelector(".select-flight-header-info-content-subText")?.innerHTML;

      const itemsList: Element[] = Array.from(
        document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item")
      );

      return subText;

      const worstPrices = [];
      for (const item of itemsList) {
        const worstMilesPrice = item.querySelector(
          "flight-fare-input-item  smiles > flight-fare-input-container-control-label"
        )?.innerHTML;
        worstPrices.push(worstMilesPrice);
      }

      return worstPrices;
    });

    console.log("page title is: ", prices);

    await browser.close();

    return Promise.resolve();
  }
}
