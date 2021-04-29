import { createReadStream, promises } from 'fs';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { join } from 'path';
import { Browser, ConsoleMessage, launch, Page } from 'puppeteer';

const pti = require('puppeteer-to-istanbul');

(async() => {
    const server: Server = createServer(async(requestMessage: IncomingMessage, serverResponse: ServerResponse) => {
        let url = requestMessage.url;

        if (!url || url === '/') {
            url = '/index.html';
        }

        const filePath = join('./dist/web', url);
        let size: number;

        try {
            const stat = await promises.stat(filePath);
            size = stat.size;
        } catch (e) {
            console.error(e);

            serverResponse.statusCode = 400;
            serverResponse.write(e.stack);
            serverResponse.end();

            return;
        }

        serverResponse.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': size
        });

        createReadStream(filePath)
            .pipe(serverResponse);
    });

    server.listen(1337);

    let failed: boolean = false;
    const browser: Browser = await launch();
    const page: Page = await browser.newPage();

    await page.coverage.startJSCoverage();

    page.on('console', (message: ConsoleMessage) => {
        if (message.type() === 'error') {
            console.error(message.text());

            failed = true;

            return;
        }

        console.log(`[LOG] ${message.text()}`);
    });

    await page.goto('http://localhost:1337', {
        waitUntil: 'load'
    });

    const watchDog = page.waitForFunction('window.__jasmineFinished === true');
    await watchDog;

    const jsCoverage = await page.coverage.stopJSCoverage();

    if (!failed) {
        pti.write([...jsCoverage], { includeHostname: true , storagePath: './.coverage' })
    }

    await browser.close();
    server.close();

    if (failed) {
        process.exit(1);
    }
})();
