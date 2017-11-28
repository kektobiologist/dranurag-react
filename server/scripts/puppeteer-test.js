const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3001/api/prescription/1048", {
    waitUntil: "networkidle2"
  });
  await page.emulateMedia("screen");
  // await page.screenshot({ path: "example.png", fullPage: true });
  var pdfPromise = await page.pdf({
    path: "prescription.pdf",
    format: "A4",
    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px"
    },
    pageRanges: "1"
  });

  await browser.close();
})();
