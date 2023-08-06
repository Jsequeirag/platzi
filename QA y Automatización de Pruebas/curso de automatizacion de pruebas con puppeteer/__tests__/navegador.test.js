const puppeteer = require("puppeteer")

describe("My first test in puppeteer", () => {
  it("Debe de abrir y cerrar el navegador", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      devTools: true,
      /* defaultViewport: {
        width: 2100,
        height: 1080,
      },*/
      // args: ["--window-size=800,800"],
      defaultViewport: null,
    })
    const page = await browser.newPage()
    await page.goto("https://google.com")
    //await delay(5000)
    await page.waitForSelector("img")
    await page.reload() //recargar la pagina
    await page.waitForSelector("img")
    await page.goto("https://espanol.yahoo.com/?p=us&guccounter=1")
    await page.waitForSelector("#ybar-logo > img._yb_onk1a._yb_1yujb")
    await page.goBack()
    await page.goForward()
    const page2 = await browser.newPage()
    await page2.goto("https://www.github.com")
    await browser.close()
  }, 30000)
})

const delay = (seconds) => {
  return new Promise((r) => setTimeout(r, seconds))
}
