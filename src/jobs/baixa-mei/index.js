const { getServices } = require('../../services/requests/get-services');
const { closure_process } = require('./closure_process');

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
        console.log(service)
        closure_process({ service });
    }
}
    

module.exports = { run };

if (require.main === module){
    (async () => {
        await run();
    })();
}