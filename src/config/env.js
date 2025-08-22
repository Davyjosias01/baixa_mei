// CommonJS (env.cjs)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const { API_IN, API_AUTHORIZATION, PFX_PATH, PFX_PWD } = process.env;
module.exports = { API_IN, API_AUTHORIZATION, PFX_PATH, PFX_PWD };
