import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PuppeteerExtraPluginAdblocker } from "puppeteer-extra-plugin-adblocker";

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    slowMo: 50,
  });
  return browser;
};

(async () => {
  puppeteer.use(new PuppeteerExtraPluginAdblocker({ blockTrackers: true }));
  puppeteer.use(StealthPlugin());
  const browser = await initBrowser();
  const page = await browser.newPage();

//   page.on('console', async (msg) => {
//     const msgArgs = msg.args();
//     for (let i = 0; i < msgArgs.length; ++i) {
//       console.log(await msgArgs[i].jsonValue());
//     }
//   });

  await page.goto(
    "https://www.smiles.com.br/mfe/emissao-passagem/?adults=2&cabin=ALL&children=0&departureDate=1701313200000&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=1701615600000&searchType=g3&segments=1&tripType=1&originAirport=VCP&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=GYN&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true"
  );
//   const cookieAcceptButton = await page.$("#onetrust-reject-all-handler");
//   if (cookieAcceptButton) {
//     await cookieAcceptButton.click();
//   } else {
//     console.log("O botão de aceitar cookies não foi encontrado.");
//   }

  await page.click("#onetrust-reject-all-handler")

  const prices = await page.evaluate(() => {
    // getting elements
    const subText = document.querySelector(".select-flight-header-info-content-subText")?.innerHTML;

    const itemsList: Element[] = Array.from(document.querySelectorAll<HTMLDivElement>(".select-flight-list-accordion-item"));

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
})();
