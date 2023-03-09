import xmlrpc from 'xmlrpc'
import url from 'url'

interface IConfig {
  url: string,
  username?: string,
  password?: string,
  port?: number | undefined,
  db?: string,
}

export class Odoo {
  host?: string | undefined
  port?: number | undefined 
  db?: string
  username?: string
  password?: string
  secure?: boolean
  uid?: number

  constructor(config: IConfig) {
    var config = config || {}
    var urlparts = url.parse(config.url);

    this.host = urlparts.hostname == null ? undefined : urlparts.hostname;
    this.port = config.port || Number(urlparts.port) == null ? undefined : Number(urlparts.port)
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.secure = true;
    this.uid = 0;

    if (urlparts.protocol !== 'https:') {
      this.secure = false
    }
  }

  connect(callback: (arg0: Object | null, arg1: null) => void) {
    var clientOptions = {
      host: this.host,
      port: this.port,
      path: '/xmlrpc/2/common'
    }
    var client;
    if (this.secure == false) {
      client = xmlrpc.createClient(clientOptions);
    }
    else {
      client = xmlrpc.createSecureClient(clientOptions);
    }

    var params = [];
    params.push(this.db);
    params.push(this.username);
    params.push(this.password);
    params.push({});
    client.methodCall('authenticate', params, function (error, value) {
      if (error) {
        return callback(error, null)
      }
      if (!value) {
        return callback({ message: "No UID returned from authentication." }, null)
      }
      
      return callback(null, value)
    });
  }
}