const { setTimeout: sleep } = require('node:timers/promises');
const { chromium } = require('playwright');

const SEL = require('./selectors/solicitaBaixa.selectors')

const rules = JSON.stringify([
    {   pattern: 'https://*.acesso.gov.br*',
        filter: { SUBJECT: { CN: 'ANA PAULA SALVATORI*'} } },
    {   pattern: 'https://sso.acesso.gov.br/login?client_id*',
        filter: { SUBJECT: { CN: 'ANA PAULA SALVATORI*'} } }
]);



async function solicitarBaixaMEI({cnpj, codigo_simples}={}) {    
    const browser = await chromium.launchPersistentContext('C:\\pw-user', {
        headless: false,
        channel: 'chrome',
        args: [`--auto-select-certificate-for-urls=${rules}`],
        args: ['--start-maximized'],
        viewport: null
    });
    //const context = await browser.newContext();
    const page = await browser.newPage();
    //console.log('Chromium OK ->', browser.version());    

    //Delay
    await sleep(500);
    
    try {
        await page.goto('https://www.gov.br/empresas-e-negocios/pt-br/empreendedor', { waitUntil: 'networkidle' });

        await page.locator(SEL.BTN_SOLICITA_BAIXA).click();
        await page.locator(SEL.BTN_LOGAR_COM_CERTIFICADO_DIGITAL).click();
        await sleep(5000000);
        



    } finally {
        await context.close();        
        await browser.close();    
    }
    
    
}


if (require.main === module){
    solicitarBaixaMEI();
}

