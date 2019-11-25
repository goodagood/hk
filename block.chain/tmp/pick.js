
const object = { a: 5, b: 6, c: 7  };
const picked = (({ a, c }) => ({ a, c }))(object);

console.log(picked); // { a: 5, c: 7 }
