const puppeteer = require("puppeteer")

describe("Extrayendo informacion", () => {
  it("Extraer La informacion de un elemento", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      defaultViewport: null,
    })
    const page = await browser.newPage()
    await page.goto("http://platzi.com", { waitUntil: "networkidle0" })
    await page.waitForSelector(
      "#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a"
    )
    const nombreBoton = await page.$eval(
      "#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a",
      (button) => button.textContent
    )
    console.log("nombreBoton", nombreBoton)

    const [button] = await page.$x(
      '//*[@id="Header-v2"]/nav[1]/section/button[2]/span'
    )
    const propiedad = await button.getProperty("textContent")
    const texto = await propiedad.jsonValue()
    console.log("texto", texto)

    const texto2 = await page.evaluate((name) => name.textContent, button)
    console.log("texto2", texto2)
    /* ------------------- otra forma de obtener el contenido ------------------- */
    const button3 = await page.waitForXPath(
      '//*[@id="Header-v2"]/nav[1]/section/button[2]/span'
    )
    const texto3 = await page.evaluate((name) => name.textContent, button3)
    console.log("texto3", texto3)

    await browser.close()
  }, 350000)

  it("Extraer el titulo de la pagina y la url", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      defaultViewport: null,
    })
    const page = await browser.newPage()
    await page.goto("http://platzi.com", { waitUntil: "networkidle0" })
    const titulo = await page.title()
    const url = await page.url()
    console.log(titulo)
    console.log(url)
    await browser.close()
  }, 350000)

  it("contar los elementos de una pagina", async () => {
    const browser = await puppeteer.launch({
      headless: false, //headless:true no necesita abrir el navegador
      slowMo: 0,
      defaultViewport: null,
    })
    const page = await browser.newPage()
    await page.goto("http://platzi.com", { waitUntil: "networkidle0" })
    const images = await page.$$eval("img", (imagenes) => imagenes.length) //regresa todos los elementos
    console.log("images", images)
  }, 35000)
})

const delay = (seconds) => {
  return new Promise((r) => setTimeout(r, seconds))
}
