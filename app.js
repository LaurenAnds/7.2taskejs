const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");

//listen
app.listen(3000);

//static files
app.use(express.static('public'));

//db
const { makeDBConnectionPool } = require("./dbHelp");

const pool = makeDBConnectionPool("omdb");

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

app.get('/songs', (req, res) => {
  const songs = [
    {
      title: "Blue Is The Eye",
      artist: "Ye Vagabonds",
      link: "https://www.youtube.com/watch?v=MTcCsIsaF7c"
    },
    {
      title: "Beetlebum",
      artist: "Blur",
      link: "https://www.youtube.com/watch?v=WAXnqjUfal4"
    },
    {
      title: "Grace",
      artist: "The Wolfe Tones",
      link: "https://www.youtube.com/watch?v=hvfhZn18lfk&t=4s"
    }
  ];
  res.render('songs', {songs})
})

app.get("/movies", async (req, res) => {
  console.log("Accessed movies page");
  const movieList = await query();
  res.render("movies", { movieList });
});

async function query(){
  const movies =  await pool
  .query("select movie_name from casts_view where person_name = 'Tom Cruise'")
return movies.rows;
}

//task 13.1 - route parameters 
app.get("/reverse/:reversedString", (req, res) => {
  console.log("Reverse string route parameter practise");
  const wordToQueryFor = req.params.reversedString;
  res.send(reverseString(wordToQueryFor));
});

function reverseString(inputString){
  return inputString.split("").reverse().join("");
}

//task 13.2
app.get("/removeVowels/:givenString", (req, res) => {
  console.log("Reverse string route parameter practise");
  const wordToRemoveVowels = req.params.givenString;
  res.send(removeVowelsFromString(wordToRemoveVowels));
});

function removeVowelsFromString(inputString){
  let vowelsList = "aeiouAEIOU";
  let result = "";
  
  for (let i = 0; i < inputString.length; i++) {
      if (vowelsList.indexOf(inputString[i]) === -1) {
          result += inputString[i];
      }
  }

  return result;
}
