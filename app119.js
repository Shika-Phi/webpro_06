"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let score = [
  { id:1, day: "2024-01-01", game: 3, alls: 500, ave: 166 }
];

app.get("/score", (req, res) => {
  res.render('keiyo2', { data: score });
});

app.get("/score/create", (req, res) => {
  res.redirect('/public/bowlingscore.html');
});


app.post("/score", (req, res) => {
  const id = score.length + 1;
  const day = req.body.day;
  const game = req.body.game;
  const alls = req.body.alls;
  const ave = req.body.ave;
  
  score.push({ id: id, day: day, game: game, alls: alls ,ave: ave});
  res.render('score', { data: score});
});

app.get("score/:number",(req,res) => {
    const number = req.params.number;
    const detail = score[number];
    res.render('score_detail', { id: number, data: detail });
});

app.get("/score/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail= score[number];
  res.render('score_edit', { id: number, data: detail });
});

app.post("/score/update/:number", (req, res) => {
  const number = req.params.number;
  score[number].id = req.body.id;
  score[number].day = req.body.day;
  score[number].game = req.body.game;
  score[number].alls = req.body.alls;
  score[number].ave = req.body.ave;
  
  res.redirect('/score');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));



