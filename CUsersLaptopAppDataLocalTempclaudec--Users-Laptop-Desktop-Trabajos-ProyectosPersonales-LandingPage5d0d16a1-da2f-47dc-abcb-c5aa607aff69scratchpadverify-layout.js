const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  // Esperar a que las secciones carguen
  await page.waitForTimeout(2000);
  
  // Screenshot de la página completa
  await page.screenshot({ 
    path: 'C:\Users\Laptop\AppData\Local\Temp\claude\c--Users-Laptop-Desktop-Trabajos-ProyectosPersonales-LandingPage\5d0d16a1-da2f-47dc-abcb-c5aa607aff69\scratchpad\layout-screenshot.png',
    fullPage: false 
  });
  
  console.log('Screenshot capturado');
  
  // Verificar que los paneles estén a la derecha
  const panelRights = await page.$$('.panel--right');
  console.log(`Paneles a la derecha: ${panelRights.length}`);
  
  await browser.close();
})();
