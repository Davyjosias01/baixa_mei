const { getServices } = require('../../services/requests/get-services');
const { process } = require('../baixa-mei/process');

async function run() {
    //Request para capturar as obrigações
    let data, services;

    try {
        data = await getServices({date_start:'01/08/2025'});
    } catch (e) {
        console.error('Erro no request para os services: ' + e);
        process.exit(1);
    }
    
    services = data?.company_services ?? [];

    for (const service of services){
        process({ service });
    }

    /*
    await installCertificate({
        pfxPath: 'C:\\Certificates\\173446145_ANA_PAULA_SALVATORI_09363179907 - vence em 2026.pfx',
        pfxPwd: '123456',
        scope: 'CurrentUser'
    });
    */
}
    

module.exports = { run };

if (require.main === module){
    (async () => {
        await run();
    })();
}