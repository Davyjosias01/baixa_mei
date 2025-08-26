require('dotenv').config();
const { execFileSync } = require('child_process');

async function installCertificate({pfxPath, pfxPwd, scope = 'CurrentUser'}){

    if (!pfxPath || !pfxPwd) throw new Error('Defina a pasta de destino do certificado e a senha do mesmo');

    const store = scope === 'LocalMachine' ? 'Cert:\\LocalMachine\\My' : 'Cert:\\CurrentUser\\My';

    execFileSync('certutil', [
        '-f',
        '-user',                // ou '-machine' (Admin)
        '-p', pfxPwd,
        '-importpfx', pfxPath
    ], { stdio: 'inherit' });
    
    console.log('Certificado instalado com sucesso!');
}

if (require.main === module){
    installCertificate();
}

module.exports = { installCertificate }