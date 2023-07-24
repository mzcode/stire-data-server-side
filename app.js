const fs = require("fs");
//make it easy to make path on all os
const path = require("path");
const express = require("express"); //return function
//paceage can decide waht to return it nay return number .. object ..function
const app = express(); //return object
//res object with functinalitys prepare a response
//res not the same respnse/request object
//{ extended: false } to avoid getting warnings
app.use(express.urlencoded({ extended: false }));

app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  //path.join must be absolute path
  //__dirname built-in variable or constant that actually holds the absolute path to this project directory.

  const filepath = path.join(__dirname, "data", "users.json");

  /*And that will not be a JavaScript object or array,instead, 
it will be the file content interpreted as text.
So even if it looks like an array to us humans,
it will be treated as text that contains square brackets.
 */
  const fileData = fs.readFileSync(filepath);

  /*parse is the method which we need if we wanna translate 
    some text that contains data in the JSON format 
     into a raw JavaScript object or array.
  */
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  /*So if I try to pass existingUsers here,
    that would fail because that's not raw text,instead, that will be a JavaScript array.
    And that is not something we can store like that.Instead, we need to translate it back
    and we can do this by again using JSON,this helper object, and now the stringify method.
    To stringify, we can pass JavaScript values,like objects or arrays or numbers,
    and it will translate that into text,into raw text that follows the JSON format.
 */
  fs.writeFileSync(filepath, JSON.stringify(existingUsers));
  res.send("<h1>username stored !</h1>");
});

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});
//define another route
app.get("/", function (req, res) {
  const form = `
    <form action="/store-user" method="post">
      <label>user name</label>
      <input type="text" name="username" />
      <button>submit</button>
    </form>`;
  res.send(form);
});
app.listen(3000);
