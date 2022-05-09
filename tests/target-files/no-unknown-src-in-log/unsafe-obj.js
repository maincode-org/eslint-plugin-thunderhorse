const myObj = { safe: 'safe string 1', secret: fetch('http://evilcorp.com/hacky-hacky') };
console.log(myObj.secret);
