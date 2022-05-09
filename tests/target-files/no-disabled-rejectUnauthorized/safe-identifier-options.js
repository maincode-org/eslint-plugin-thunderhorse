import tls from 'tls';

const options = { isServer: true, rejectUnauthorized: true };
const socket = new tls.TLSSocket(undefined, options);
