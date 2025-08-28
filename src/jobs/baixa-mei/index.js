const { chromium } = require('playwright');
const { getServices } = require('../../services/requests/get-services');
const { installCertificate } = require('../../services/install-certificate');
const { getCertificate } = require('../../services/requests/get-certificate');
const { getCompany } = require('../../services/requests/get-company');
const { CUSTOMER_PORTAL_URL } = require('../../utils/urls');


async function run() {
    //Request para capturar as obrigações
    let data, services;

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


            //Processo no site do MEI 
            const browser = await chromium.launch({headless: false, args: ['--start-maximized']});
            const context = await browser.newContext({viewport: null});
            const page = await context.newPage();


            await page.goto(CUSTOMER_PORTAL_URL, { waitUntil: 'networkidle', timeout: 60000 });

            
            await browser.close();


        }
    }
}

    

module.exports = { run };

if (require.main === module){
    (async () => {
        await run();
    })();
}