const mongoose = require("mongoose");
// create a connection and database
mongoose.connect("mongodb://127.0.0.1:27017/FruitsDB");

// create a mongoose schema that works as a blueprint
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check the data no name specified!!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// create a mongoose model--> String(in singular form) represents a collection
// mongoose.model("String(in singular form)", schemaName)
const Fruit = mongoose.model("Fruit", fruitSchema);
// String(in singular form) automatically converted to plural form

// create a document to be stored
const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Pretty good",
});

const peaches = new Fruit({
  name: "Peaches",
  rating: 4,
  review: "Dont like it",
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit",
});

const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "Gotta love mangoes"
});



// fruit.save()

// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 5,
//     review: "Not that great"
// });

// const orange = new Fruit({
//     name: "Orange",
//     rating: 6,
//     review: "Mast fruit"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 8,
//     review: "Good for health"
// });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // adding a relationship
  // embedding a fruit document inside a person document
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 37,
// });

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
})


async function run() {
  // await Fruit.insertMany([kiwi, orange, banana]).then(function () {
  //     console.log("Successfully saved default items to DB");
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  //   const found = await Fruit.find();
  // //   console.log(found);
  // found.forEach((obj)=>{
  //     console.log(obj.name);
  // })
  // await peaches.save().catch(err=>(console.log(err)));
  // await Fruit.updateOne({_id:"6484513f5e16d2aab706ec90"},{rating: 2}).catch(err=>{console.log(err)});
//   await Fruit.deleteOne({_id:"648469f14e13b60258eca9e0"}).catch(err=>{console.log(err)});
// await Person.deleteMany({name: "John"}).catch(err=> {console.log(err)});
// await pineapple.save();
// await person.save();
await mango.save();
await Person.updateOne({name:"John"},{favouriteFruit:mango});
  mongoose.connection.close();
}

run().catch((err) => console.log(err));
