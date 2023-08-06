const puppeteer = require("puppeteer")

describe("My first test in puppeteer", () => {
  it("Debe de abrir y cerrar el navegador", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      devTools: true,
    })
    const page = await browser.newPage()
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html")
    /*await page.click("#authentication > span", { button: "right", delay: 500 })*/
    page.on("dialog", async (dialog) => {
      await dialog.accept()
    })
    await page.click("#authentication > button", { clickCount: 2, delay: 500 })
    await delay(5000)
    await page.goto("https://devexpress.github.io/testcafe/example/")
    await page.type("#developer-name", "Jose", {
      delay: 500,
    })
    await delay(3000)
    await page.click("#remote-testing")
    await page.click("#tried-test-cafe")
    await delay(3000)
    await page.select("#preferred-interface", "JavaScript API")
    await delay(1000)
    await page.type("#comments", "Esto es un comentario")
    await delay(1000)
    await page.click("#submit-button")
    await delay(3000)
    await browser.close()
  }, 30000)
})

const delay = (seconds) => {
  return new Promise((r) => setTimeout(r, seconds))
}
