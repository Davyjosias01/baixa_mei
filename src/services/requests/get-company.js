const { API_AUTHORIZATION } = require('../../config/env');
const { COMPANIES_URL } = require('../../utils/urls');
const { getJson } = require('../../utils/http');

async function getCompany({ cnpj, companyId, fields='cnpj' }) {
    if(!cnpj && !companyId) throw new Error('Informe corretamente o CNPJ ou o id da empresa')

    const url = new URL(COMPANIES_URL);
    url.searchParams.set('fields', fields );
    if (cnpj)url.searchParams.set('cnpj', cnpj);
    if (companyId)url.searchParams.set('company_id', companyId);
    return await getJson({ url: url, headers: { Authorization: API_AUTHORIZATION, Accept: 'application/json'} });
}

module.exports = { getCompany };


if (require.main === module) {
    (async () => {
        try {
            const data = await getCompany({ companyId: '3c860749-8a1c-43b8-aefa-96eeb2b98b1d', fields: 'cnpj,dominio_code,ie,id' });
            console.log(data);
        
        } catch (e) {
            console.log("Erro ao fazer o get-company:" + e);
            process.exit(1);
            
        }
    })();
    
}