// CommonJS (env.cjs)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const { CERTIFICATES_URL, SERVICES_URL, API_AUTHORIZATION, PFX_PATH, PFX_PWD } = process.env;
module.exports = { CERTIFICATES_URL, SERVICES_URL, API_AUTHORIZATION, PFX_PATH, PFX_PWD };
