"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let score = [
  { id:1,day: "2024-01-01", game: 3, alls: 500, ave: 166 },
  { id:2,day: "2024-01-02", game: 3, alls: 500, ave: 166 },
  { id:3,day: "2024-01-03", game: 3, alls: 500, ave: 166 }
];

app.get("/score", (req, res) => {
    res.render('score', { data: score });
});

app.get("/score/create", (req, res) => {
  res.redirect('/public/bowlingscore.html');
});



app.get("/score/:number", (req, res) => {

  const number = req.params.number;
  const detail = score[number];
  res.render('score_detail', {numr:number, data: detail });
});



app.get("/score/delete/:number", (req, res) => {
  score.splice( req.params.number, 1 );
  res.redirect('/score' );
});

app.post("/score", (req, res) => {
  // 本来ならここにDBとのやり取りが入る

  const id = score.length + 1;
  const day = req.body.day;   
  const game = req.body.game; 
  const alls = req.body.alls; 
  const ave = req.body.ave;   
  const newdata = {id:id, day: day, game: game, alls: alls, ave: ave };

  score.push(newdata); // 1回だけ追加
  console.log( score );
  res.render('score', {data: score} );
});

app.get("/score/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = score[ number ];
  res.render('score_edit', {numr: number, data: detail} );
});


// Update
app.post("/score/update/:number", (req, res) => {
  const number = req.params.number;
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  score[req.params.number].id = req.body.id;
  score[req.params.number].day = req.body.day;
  score[req.params.number].game = req.body.game;
  score[req.params.number].alls = req.body.alls;
  score[req.params.number].ave = req.body.ave;
  console.log( score );
  res.redirect('/score' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));