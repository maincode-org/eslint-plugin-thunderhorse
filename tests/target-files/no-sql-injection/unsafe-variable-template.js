const city = fetch('https://evilcorp/hacky-hacky');
const sql = `SELECT * FROM users WHERE city = ${city}`;
