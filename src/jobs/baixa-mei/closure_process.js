const { installCertificate } = require('../../services/install-certificate');
const { getCertificate } = require('../../services/requests/get-certificate');
const { getCompany } = require('../../services/requests/get-company')

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
        await installCertificate({ pfxPath: certificateAddress, pfxPwd: certificate.digital_certificate_password});

        //Processo no site do MEI 




    }

}

module.exports = { closure_process };