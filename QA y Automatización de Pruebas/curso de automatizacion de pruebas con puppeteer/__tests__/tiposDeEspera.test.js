const puppeteer = require("puppeteer")

describe("My first test in puppeteer", () => {
  it("Debe de abrir y cerrar el navegador", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      devTools: true,
      defaultViewport: null,
    })
    const page = await browser.newPage()

    await page.goto("https://demoqa.com/modal-dialogs", {
      waitUntil: "networkidle2",
    })

    //espera explicita
    await delay(5000)
    //*[@id="app"]/header/a/img
    await page.waitForXPath('//*[@id="app"]/header/a/img')
    await delay(5000)
    const button = await page.waitForSelector("#showSmallModal", {
      visible: true, // Que se muestre no solamente este
    })
    await delay(5000)
    await button.click()
    //espera por funcion
    await page.waitForFunction(
      () =>
        document.querySelector("#example-modal-sizes-title-sm").innerText ===
        "Small Modal"
    )
    await delay(5000)
    await page.click("#closeSmallModal")
    await page.waitForFunction(
      () => !document.querySelector("#example-modal-sizes-title-sm")
    )
    /*  const observaResize = page.waitForFunction("window.innerWidth<100")
    await page.setViewport({ width: 50, height: 50 })
    await observaResize
    await browser.close()*/
  }, 30000)
})

const delay = (seconds) => {
  return new Promise((r) => setTimeout(r, seconds))
}
