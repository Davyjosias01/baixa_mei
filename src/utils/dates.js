
const TZ = 'America/Sao_Paulo';
const ymd = d => new Intl.DateTimeFormat('en-CA').format(d);

const hoje = new Date();

const fmtBR = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

const DEFAULT_DATE_START = fmtBR.format(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
const DEFAULT_DATE_END   = fmtBR.format(new Date(hoje.getFullYear(), hoje.getMonth()+1, 1));

const DATE_END_CERTIFICATE = fmtBR.format(new Date(hoje.getFullYear()+5, 12, 31));

module.exports = { 
    DEFAULT_DATE_END, 
    DEFAULT_DATE_START, 
    DATE_END_CERTIFICATE 
};