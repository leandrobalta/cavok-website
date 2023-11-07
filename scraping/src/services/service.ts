import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PuppeteerExtraPluginAdblocker } from "puppeteer-extra-plugin-adblocker";
import { Browser } from "puppeteer";
import Logger from "../utils/logger";
import { SearchTravelRequest, Travel } from "../models/SearchTravel";
import { program } from "..";

export abstract class Service {
    constructor() {
        Logger.info("Starting service...");
        puppeteer.use(new PuppeteerExtraPluginAdblocker({ blockTrackers: true }));
        puppeteer.use(StealthPlugin());
    }

    async initBrowser() {
        const browser = await puppeteer.launch({
            //executablePath: '/usr/bin/google-chrome',
            args: ["--no-sandbox", "--disable-setuid-sandbox", '--enable-logging,'],
            headless: true
        });

        program.puppeteerProcesses.set("", browser);

        return browser;
    }

    async newPage(browser: Browser) {
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on("request", (req) => {
            if (req.resourceType() === "stylesheet" || req.resourceType() === "font" || req.resourceType() === "image") {
                req.abort();
            } else {
                req.continue();
            }
        });

        page.on("console", (msg) => {
            for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`);
        });

        return page;
    }

    async closeBrowser(browser: Browser) {
        await browser.close();
    }

    parseCurrencyStringToFloat(currencyString: string): number {
        const cleanedString = currencyString.replace(".", "").replace(",", ".");
      
        const floatValue = parseFloat(cleanedString);
      
        return floatValue;
    }

    abstract search(travel: SearchTravelRequest): Promise<Travel[]>;
}