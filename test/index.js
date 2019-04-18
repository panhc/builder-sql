let Buidler = require('../Builder');

let builder = new Buidler('table');

 let b = builder.skip(20).clone();

 b.limit(10);

console.log(builder.toSql());
console.log(b.toSql());