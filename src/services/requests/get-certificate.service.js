const { CERTIFICATES_URL, API_AUTHORIZATION } = require('../../config/env')


async function getCertificate({}) {
    console.log(process.env.API_AUTHORIZATION);
    console.log(process.env.CERTIFICATES_URL);
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