async function getJson({url, headers = {}} = {}) {
    console.log(url);
    const res = await fetch(url, {headers, method:'GET'});
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
    return res.json();
}

async function getBuffer({url, headers = {}} = {}) {
    const res = await fetch(url, {headers, method: 'GET'});
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
}


module.exports = { getJson, getBuffer };