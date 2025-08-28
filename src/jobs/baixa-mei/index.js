const { chromium } = require('playwright');
const { createInterface } = require('node:readline/promises');

const { getCompany } =          require('../../services/requests/get-company');
const { getServices } =         require('../../services/requests/get-services');
const { getCertificate } =      require('../../services/requests/get-certificate');
const { installCertificate } =  require('../../services/install-certificate');
const { CUSTOMER_PORTAL_URL, JA_SOU_MEI_URL } = require('../../utils/urls');
const { SELECTORS } = require('../../utils/selectors');
const { execFileSync } = require('node:child_process');

async function run() {
    //Request para capturar as obrigações
    let data, services;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));    

    try {
        data = await getServices({date_start:'01/08/2025', date_end:'01/08/2026'});
    } catch (e) {
        console.error('Erro no request para os services: ' + e);
    }
    services = data?.company_services ?? [];


    for (const service of services){
        if (!service) throw new Error('Informe o service corretamente na chamada da funcao.');

        //Buscando empresa
        data = await getCompany({companyId: service.company_id, fields: 'dominio_code,cnpj,ie,fantasy_name,id'});
        company = data?.companies?.[0];
        if (!company) continue;

        //Caminho do certificado
        const certificateAddress = `C:\\Certificates\\${company.cnpj} - ${company.fantasy_name}.pfx`;

        if(company){
            console.log(`Iniciando o processo de baixa da empresa: ${company.id} - CNPJ: ` + company.cnpj);

            /*
            //Buscando informações sobre o certificado
            try {
                certificate = await getCertificate({cnpj: company.cnpj, destPath: certificateAddress});
                if (!certificate) continue;
                certificate = certificate?.companies?.[0];
            } catch (e) {
                console.log(e);
                continue;
            }
            
            //Instalar o certificado
            try {
                await installCertificate({ pfxPath: certificateAddress, pfxPwd: certificate.digital_certificate_password});
            } catch (e) {
                console.log(e);
                continue;
            }
            */

            //Processo no site do MEI 
            const browser = await chromium.launch({channel: 'chrome', headless: false, args: ['--start-maximized']});
            const context = await browser.newContext({viewport: null});
            const page = await context.newPage();


            await page.goto(CUSTOMER_PORTAL_URL, { waitUntil: 'networkidle', timeout: 60000 });
            await page.locator(SELECTORS.BTN_LOGIN_NO_GOV).click();
            await page.locator(SELECTORS.BTN_SEU_CERTIFICADO_DIGITAL).waitFor({ state: 'visible', timeout: 20000 });
            
            await waitHumanBox({ message: 'Faça o login no gov de acordo com as credenciais do cliente.' });

            await page.goto(JA_SOU_MEI_URL, { waitUntil: 'networkidle', timeout: 60000 });
            




/*
            await loc.waitFor({ state: 'visible', timeout:  16000 });
            await loc.scrollIntoViewIfNeeded();
            await loc.click({ timeout });
*/
            await browser.close();
        }
    }
}

function psEscape(s = ''){return String(s).replace(/'/g, "''");}

async function waitHumanBox({ message, title = 'Caixa de espera', buttons = 'OKCancel', icon = 'Information' }={}) {
    const ps = `
Add-Type -AssemblyName System.Windows.Forms
$btns = [System.Windows.Forms.MessageBoxButtons]::${buttons}
$ico  = [System.Windows.Forms.MessageBoxIcon]::${icon}
$r = [System.Windows.Forms.MessageBox]::Show('${psEscape(message)}','${psEscape(title)}',$btns,$ico)
if ($r -eq [System.Windows.Forms.DialogResult]::OK) { exit 0 } else { exit 1 }
`;
  try {
    execFileSync('powershell.exe', ['-NoProfile','-Sta','-ExecutionPolicy','Bypass','-Command', ps], { stdio: 'inherit' });
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function waitHumanTerminal(msg = 'Conclua a ação e pressione Enter...') {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    await rl.question(`${msg}\n`);
    rl.close();
}

module.exports = { run };

//Se for requerido o node .\index.js
if (require.main === module){
    (async () => {
        await run();
    })();
}