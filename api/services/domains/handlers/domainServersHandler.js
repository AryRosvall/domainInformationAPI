const whois = require('node-xwhois');
const axios = require("axios");
const extractor = require('unfluff');

async function whoIsServer(server) {
  info = await whois.whois(server.ipAddress)
  const stringInfo = JSON.stringify(info, null, 4);
  const country = stringInfo.match(/(Country:\s*)([A-Z]+)/) !== null ? stringInfo.match(/(Country:\s*)([A-Z]+)/)[2] : null;
  const owner = stringInfo.match(/(OrgName:\s*)([\w\s.]*)(\\n)/) !== null ? stringInfo.match(/(OrgName:\s*)([\w\s.]*)(\\n)/)[2] : null;

  return { ...server, country, owner }
}

async function scrapPage(domain) {
  const responseHTML = await axios.get(`https://${domain}`);
  const html = responseHTML.data;
  return extractor(html);
}

async function domainServersHandler(domain) {

  try {

    if (domain === undefined) {
      return false
    }

    const grades = {
      "1": "A+",
      "2": "A",
      "3": "B",
    }

    const data = await scrapPage(domain);
    const logo = data.image;
    const title = data.title;

    const response = await axios.get(`https://api.ssllabs.com/api/v3/analyze?host=${domain}`)

    if (response.data === undefined) {
      return false;
    }

    const servers = response.data.endpoints;
    let lowerGrade = 0;

    if (servers === undefined) {
      return false;
    }

    serversN = await Promise.all(servers.map(server => {
      const { ipAddress, serverName, grade } = server;
      const currentGrade = Object.keys(grades).find(key => grades[key] === grade);
      if (currentGrade > lowerGrade) {
        lowerGrade = currentGrade;
      }
      return whoIsServer({ ipAddress, serverName, grade })
    }))

    const results = {
      domain,
      servers: serversN,
      ssl_grade: grades[lowerGrade],
      logo,
      title,
      is_down: false,

    }

    return results

  } catch (err) {
    return false
  }
}

module.exports = domainServersHandler;
