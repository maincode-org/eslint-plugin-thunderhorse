const myObj = { safe: 'safe string 1', secret: fetch('https://evilcorp.com/hacky-hacky') };
console.log(myObj.secret);
