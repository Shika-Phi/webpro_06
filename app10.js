"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// 【追加】フォームからのPOSTデータ(req.body)を受け取るための設定
app.use(express.urlencoded({ extended: true }));

// データ格納用配列
let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let score = [
  {no: 0, id: "YYYY/MM/DD", all: 25, code: 5000, ave: 200}
];

// 【修正】IDカウンターをルートの外に出して、番号がリセットされないようにする
let No = 0; 

app.get("returnhome", (req, res) => {
  // 注意: renderは1回しか呼べません。通常はどちらか一つ、あるいはデータをまとめて渡します。
  // ここではボウリングのアプリとして動かすため db2 を優先します。
  res.render('db3', { data: score }); 
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  


  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

// 追加機能
app.get("/bowlingscore", (req, res) => {
  // クエリパラメータが空の場合は表示だけ行う（エラー防止）
  if(!req.query.id) {
     return res.render('db3', { data: score });
  }

  let id = req.query.id;
  let all = req.query.all;
  let code = req.query.code;
  let ave = req.query.ave;
  
  ave=code/all;

  // 【修正】グローバル変数のカウンターを増やす
  No += 1;
  
  let newdata = { no: No, id: id, all: all, code: code, ave: ave };
  score.push( newdata );
  res.render('db3', { data: score });
});
// 【新規追加】削除機能のルート
app.post("/delete", (req, res) => {
    // フォームから送られてきた no を取得
    let targetNo = req.body.no;

    // targetNo と一致しないデータだけを残す（＝一致するデータを削除）
    // 注意: formから来るデータは文字列なので比較時に型を合わせるか != を使います
    score = score.filter(row => row.no != targetNo);

    // 更新されたデータで再描画
    res.redirect('bowlingscore');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));