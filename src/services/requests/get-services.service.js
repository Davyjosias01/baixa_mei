const { API_AUTHORIZATION } = require('../../config/env');
const { DEFAULT_DATE_START, DEFAULT_DATE_END } = require('../../utils/dates');
const { SERVICES_URL } = require('../../utils/urls');
const { getJson } = require('../../utils/http');

async function getServices({ date_start = DEFAULT_DATE_START, date_end = DEFAULT_DATE_END, company_id } = {}) {
  if (!SERVICES_URL) throw new Error('Variável de ambiente SERVICES_URL não definida.');

  const url = new URL(SERVICES_URL);
  url.searchParams.set('date_start', date_start);
  url.searchParams.set('date_end', date_end);
  url.searchParams.set('service', 'baixa_de_mei_dentro_de_6_meses');
  url.searchParams.set('obligation_finished', 'false');
  url.searchParams.set('integrated_at', 'false');
  
  if (company_id) url.searchParams.set('company_id', company_id);

  return await getJson({url: url, headers: { Authorization: API_AUTHORIZATION, Accept: 'application/json' } });
}

module.exports = { getServices };

// Executar diretamente: aguarde e trate erros
if (require.main === module) {
  (async () => {
    try {
      const data = await getServices({});
      console.log(data);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
