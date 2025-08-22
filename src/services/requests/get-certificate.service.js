const { API_AUTHORIZATION } = require('../../config/env');
const { CERTIFICATES_URL } = require('../../utils/urls');
const { DATE_END_CERTIFICATE } = require('../../utils/dates');



async function getCertificate({ certificateType } = {}) {
    if(!CERTIFICATES_URL) throw new Error("Não foi encontrada a variável CERTIFICATES_URL no arquivo .env!");
    if(!API_AUTHORIZATION) throw new Error("Não foi encontrada a variável API_AUTHORIZATION no arquivo .env!");
    
    const url = new URL(process.env.CERTIFICATES_URL);
    url.searchParams.set('date_start', '01/01/2000');
    url.searchParams.set('date_end', DATE_END_CERTIFICATE);

    




}




if (require.main === module) {
    ( async () => {
        try {
            const data = getCertificate({});
            console.log(data);
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
        
    })();
}