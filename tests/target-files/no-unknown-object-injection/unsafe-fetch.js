const myObj = { name: 'John', age: 25, secret: 'secret' };
const apiResult = fetch('https://evilcorp.com/hacky-hacky');
console.log(myObj[apiResult]);
