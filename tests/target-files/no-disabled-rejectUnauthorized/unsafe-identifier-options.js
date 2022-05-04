import tls from "tls";

const options = { isServer: true, rejectUnauthorized: false }
const socket = new tls.TLSSocket(undefined, options);