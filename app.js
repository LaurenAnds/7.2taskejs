const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");

//listen
app.listen(3000);

app.get("/", (req, res) => {
  console.log("Accessed home page");
  res.render("index");
});

app.get("/about", (req, res) => {
  console.log("Accessed about page");
  res.render("about");
});

app.get("/create", (req, res) => {
  console.log("Accessed create page");
  res.render("create");
});

app.get("/dieroll", (req, res) => {
  console.log("Accessed die roll page");
  res.render("dieroll", { roll: randomDieRoll1()});
});
function randomDieRoll1() {
  return 1 + Math.floor(Math.random() * 6);
}


app.get("/strings", (req, res) => {
  console.log("Strings page accessed");
  const stringsArray = ["apple", "banana", "orange", "grape", "kiwi", "strawberry", "blueberry"]
  res.render("strings", { stringsArray });
});
// function loopThroughStrings(inputArray){
//   for(let element of inputArray){
//     return element;
//   }
// }