const { installCertificate } = require('../../services/install-certificate');
const { getCertificate } = require('../../services/requests/get-certificate');
const { getCompany } = require('../../services/requests/get-company')

async function process({ service } = {}) {
    if (!service) throw new Error('Informe o service corretamente na chamada da funcao.');


    data = await getCompany({companyId: service.company_id, fields: 'dominio_code,cnpj,ie,fantasy_name,id'});
    company = data?.companies?.[0];

    if(company){
        console.log(company);
        console.log(`Iniciando o processo de baixa da empresa: ${company.company_id}. CNPJ: ` + company.cnpj);

        certificate = await getCertificate({cnpj: company.cnpj, destPath: 'C:\\Certificates\\'+company.cnpj+'-'+company.fantasy_name});

        installCertificate();
    }

    





}

module.exports = { process };