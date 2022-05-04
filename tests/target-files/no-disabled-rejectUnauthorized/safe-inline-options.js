import tls from "tls";

const socket = new tls.TLSSocket(undefined, { isServer: true, rejectUnauthorized: true });