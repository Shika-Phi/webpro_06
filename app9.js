const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("returnhome", (req, res) => {
  res.render('index', { data: station });
  res.render('index',{data: score})
});





app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
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


app.get("/bowlingscore/:number" ,(req,res)=>{
  const number = req.params.number;
  const detail = score[number];
  res.render('score_detail',{data:detail});
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];



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