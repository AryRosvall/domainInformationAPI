const domainServersHandler = require('./handlers/domainServersHandler');

/**
   * Controller that validate the request information and sends it to the store
   * @param  {} injectedStore
   * @param  {} TABLE
   * @returns {} CRUD functions
   */
module.exports = function (InjectedStore, TABLE) {
  const store = new InjectedStore();

  /**
     * Function that list the domains.
     * @returns Promise<{ domains: {} }>}
     */
  async function listDomains() {
    try {

      const domains = await store.list(TABLE);

      return ({
        domains
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     * Function that receives the domain and returns the domain information object
     *
     * @param {String} domain
     * @returns {Promise<{ domain: {}}>}
     */
  async function getDomain(domain) {

    try {

      const serverOld = await store.get(TABLE, domain);

      const serverInfo = await domainServersHandler(domain);

      if (serverInfo === false) {
        return { message: "Domain does not exists" }
      }

      if (serverOld === null) {
        const serverInserted = await store.insert(TABLE, serverInfo);
        return { ...serverInfo, previous_ssl_grade: "no data", servers_changed: false }
      }

      if (JSON.stringify(serverOld.servers) === JSON.stringify(serverInfo.servers)) {
        return { ...serverInfo, previous_ssl_grade: serverOld.ssl_grade, servers_changed: false };
      } else {
        const updatedCount = await store.update(TABLE, id, serverInfo);
        return { ...serverInfo, previous_ssl_grade: serverOld.ssl_grade, servers_changed: true }
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    listDomains,
    getDomain,
  };
};
