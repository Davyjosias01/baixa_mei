const { chromium } = require('playwright');

const { getServices } = require('../../services/requests/get-services');
const { installCertificate } = require('../../services/install-certificate');
const { getCertificate } = require('../../services/requests/get-certificate');
const { getCompany } = require('../../services/requests/get-company')

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
        async function closure_process({ service } = {}) {
        if (!service) throw new Error('Informe o service corretamente na chamada da funcao.');

        const certificateAddress = `C:\\Certificates\\${company.cnpj} - ${company.fantasy_name}.pfx`;

        data = await getCompany({companyId: service.company_id, fields: 'dominio_code,cnpj,ie,fantasy_name,id'});
        company = data?.companies?.[0];

        if(company){
            console.log(`Iniciando o processo de baixa da empresa: ${company.id} - CNPJ: ` + company.cnpj);

            //Get the certificate and the informations about
            certificate = await getCertificate({cnpj: company.cnpj, destPath: certificateAddress});
            if (!certificate)throw new Error('Empresa não possui certificado, finalizando o processo');
            certificate = certificate?.companies?.[0];
        
            //Instalar o certificado
            try {
                await installCertificate({ pfxPath: certificateAddress, pfxPwd: certificate.digital_certificate_password});
            } catch (error) {
                continue;
            }


            //Processo no site do MEI 
            const browser = await chromium.launch()
    }

}
    }
}
    

module.exports = { run };

if (require.main === module){
    (async () => {
        await run();
    })();
}