const { API_AUTHORIZATION }     = require('../../config/env');
const { CERTIFICATES_URL }      = require('../../utils/urls');
const { DATE_END_CERTIFICATE }  = require('../../utils/dates');
const { getBuffer, getJson }    = require('../../utils/http')
const fs                        = require('node:fs/promises');
const path                      = require('node:path')


async function getCertificate({ certificateType = 'E-CNPJ A1', hasProcuration, cnpj, destPath, } = {}) {
    if(!CERTIFICATES_URL) throw new Error("Não foi encontrada a variável CERTIFICATES_URL.");
    if(!API_AUTHORIZATION) throw new Error("Não foi encontrada a variável API_AUTHORIZATION.");
    if(!cnpj) throw new Error("É necessário que seja informado o CNPJ da empresa em questão.")
    if(!destPath) throw new Error("É necessário informar a pasta de destino do certificado.")    
    
    const url = new URL(CERTIFICATES_URL);
    url.searchParams.set('cnpj', cnpj)
    url.searchParams.set('date_start', '01/01/2000');
    url.searchParams.set('date_end', DATE_END_CERTIFICATE);
    url.searchParams.set('certificate_type', certificateType);
    if(hasProcuration)url.searchParams.set('has_procuration', hasProcuration);

    const buffer = await getBuffer({ url, headers: { Authorization: API_AUTHORIZATION } });
    await fs.mkdir(path.dirname(destPath), { recursive: true }).catch(() => {});
    await fs.writeFile(destPath, buffer);
    data = await getCertificateInformation({url});
    info = data?.companies?.[0];
    return info;
}

async function getCertificateInformation({url}={}){
    console.log(url);
    const data = await getJson({url, headers: { Authorization: API_AUTHORIZATION, Accept: 'application/json' }});
    return data;
}

module.exports = { getCertificate };

if (require.main === module) {
    ( async () => {
        try {
            const data = await getCertificate({cnpj: '46752607000129', destPath: 'C:\\Certificates\\certificado_importado_leonor_lampert.pfx'});
            console.log(data);
        
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
        
    })();
}