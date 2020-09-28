// Object Destructuring

// const person = {
//   name: "Andrew",
//   age: 26,
//   location: {
//     city: "Philadelphia",
//     temp: 92,
//   },
// };

// const { name = "Anonymous", age } = person;
// console.log(`${name} is ${age}`);

// const { temp: temperature, city } = person.location;

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin",
//   },
// };

// const { name: publisherName = "Self-Published" } = book.publisher;
// console.log(publisherName);

// Array Destructuring

const address = [
  "1299 S Juniper Street",
  "Philadelphia",
  "Pennsylvania",
  "19147",
];

// const [street, city, state, zip] = address;
// console.log(`Your are in ${city} ${state}`);

const address2 = [];
const [, , state = "New York"] = address2;
console.log(`Your are in ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice} `);
