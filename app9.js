const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("returnhome", (req, res) => {
  res.render('index', { data: station });
  res.render('index',{data: score})
});


app.get("/bowlingscore", (req, res) => {
  let id = req.query.id;
  let all = req.query.all;
  let code = req.query.code;
  let ave = req.query.ave;
  let newdata = { id: id, all: all ,code: code, ave: ave };
  score.push( newdata );
  res.render('db2', { data: score });
});


let score=[
  {id:"YYYY/MM/DD", all:25 , code:5000 , ave:200}
];



app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));